# HookHub — MVP Specification

> This document is the source of truth for the HookHub MVP. It describes **what to build**, not
> how the current template looks today. Implementation should follow this spec.

## 1. Overview & Goal

**HookHub** is a directory site for discovering cool, open-source **Claude Code hooks**.

Claude Code hooks are user-defined shell commands / handlers that fire at lifecycle events —
`PreToolUse`, `PostToolUse`, `Notification`, `Stop`, `SessionStart`, and others — configured in a
project's or user's `.claude/settings.json`. The community publishes useful hooks across many
GitHub repositories, but there is no single place to browse them.

**MVP goal:** a single page that displays a curated set of Claude hooks in a responsive grid.
Each hook shows its name, category, and description, and links out to its source GitHub repo.
Live metadata (name, description, star count) is pulled from the GitHub API.

## 2. MVP Scope

**In scope**
- A home page that renders **all** curated hooks in a responsive grid.
- Each card displays: name, category, short description, star count, and a link to the repo.
- Hook metadata is fetched **live from the GitHub API** at build/request time (cached).

**Out of scope (future enhancements — do not build yet)**
- Search and category filtering
- User submissions / adding hooks via UI
- Authentication / accounts
- Pagination or infinite scroll
- Per-hook detail pages
- A database or CMS

## 3. Data Model

A **Hook** combines editorial (curated) fields maintained in this repo with live fields fetched
from GitHub. `category` is editorial — GitHub cannot provide it — so the source of truth is a
curated list of `{ repo, category }` entries; everything else is fetched live.

| Field         | Source   | Notes                                              |
| ------------- | -------- | -------------------------------------------------- |
| `repo`        | Curated  | `"owner/name"` — the GitHub slug                   |
| `category`    | Curated  | One value from the fixed enum in §4                |
| `name`        | GitHub   | Repo name (`full_name` / `name`)                   |
| `description` | GitHub   | Repo description (fall back to a placeholder)      |
| `htmlUrl`     | GitHub   | `html_url` — link target for the card              |
| `stars`       | GitHub   | `stargazers_count`                                 |
| `owner`       | GitHub   | `owner.login` (+ optional `owner.avatar_url`)      |

## 4. Categories (fixed enum for MVP)

Editorial list — refine as the catalog grows:

- Formatting
- Security / Guardrails
- Notifications
- Logging & Observability
- Testing
- Git & Version Control
- Productivity / Other

Model this as a TypeScript union type so the curated data is type-checked.

## 5. Data Source & Fetching Strategy

- **Curated seed list** lives at `app/data/hooks.ts` — an array of `{ repo, category }`.
- Fetching happens in an **async Server Component** using the built-in `fetch` with Next.js
  caching: `fetch(url, { next: { revalidate: 3600 } })`. This caches responses so GitHub isn't
  hit on every request.
- Fetch all repos **in parallel** with `Promise.all`.
- **Graceful degradation:** if a single repo fetch fails (404, rate limit, network), that card
  either falls back to curated-only data or is skipped — it must **not** crash the whole page.

### GitHub rate limits

- Unauthenticated requests: **60/hour** per IP.
- With a token (`Authorization: Bearer <token>` header): **5000/hour**.
- Support an **optional** `GITHUB_TOKEN` environment variable. When present, send it in the
  Authorization header; when absent, fall back to unauthenticated requests (fine for local dev
  with a small seed list). Never commit the token — read it from `process.env`.

## 6. UI / Layout

- The home page (`app/page.tsx`) becomes an **async Server Component** that fetches the hooks and
  renders a `<HookGrid>` of `<HookCard>` components.
- **Grid:** responsive CSS grid — 1 column on mobile, scaling to 2–3 columns on larger screens
  (Tailwind utilities, e.g. `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`).
- **Palette / typography:** match the existing template — zinc-based colors with dark-mode
  variants and the Geist font already configured in `app/layout.tsx`.
- **`HookCard`** shows:
  - Name, as a link to the repo (`target="_blank"`, `rel="noopener noreferrer"`).
  - A category **badge**.
  - Description (truncated to a couple of lines).
  - Star count.
- **States to handle:**
  - **Empty:** curated list is empty → show a friendly "no hooks yet" message.
  - **Error / fallback:** GitHub unreachable or rate-limited → render available/curated data
    without breaking the page.

## 7. Proposed File Structure

```
app/
  page.tsx              # async Server Component: fetch + render grid
  data/hooks.ts         # curated [{ repo, category }] seed list + Category type
  lib/github.ts         # fetchHook(repo) -> live metadata, with revalidate + optional token
  components/
    hook-grid.tsx       # grid layout wrapper
    hook-card.tsx       # single hook card
```

## 8. Tech Constraints

- This repo runs **Next.js 16**, which has breaking changes from earlier versions. Before writing
  code, verify APIs against the local docs in `node_modules/next/dist/docs/` (see the repo's
  `AGENTS.md` and root `CLAUDE.md`). Do not rely on older blog-post patterns.
- Use **Server Components** for the GitHub fetch — no client-side data fetching is needed for the
  MVP. Keep components in `app/` per the existing App Router conventions.
- Use the `@/*` import alias and Tailwind utility classes, consistent with the existing setup.

## 9. Acceptance Criteria

- Visiting `/` shows **every** curated hook as a card in a responsive grid.
- Each card links to the correct GitHub repo and displays live name, description, and star count.
- The page renders without crashing when GitHub is rate-limited or unreachable (graceful
  fallback to curated data).
- **No** search or filter UI is present (confirms the MVP scope).

## 10. Verification

Once implemented, validate end-to-end:

1. Add a few real hook repos to `app/data/hooks.ts`.
2. Run `npm run dev` and open `http://localhost:3000`.
3. Confirm the grid renders one card per curated entry with live metadata and working repo links.
4. Simulate failure (e.g. an invalid repo slug or offline) and confirm the page still renders.
