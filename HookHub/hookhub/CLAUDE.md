# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HookHub is a Next.js application using React 19 with TypeScript, Tailwind CSS v4, and the modern App Router pattern. The project is a fresh Next.js template with minimal customization.

## Development Commands

```bash
npm run dev      # Start development server on http://localhost:3000
npm run build    # Build for production
npm start        # Start production server (requires build first)
npm run lint     # Run ESLint to check code quality
```

## Tech Stack

- **Framework**: Next.js 16.3.1 with App Router
- **UI Library**: React 19.2.8
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with PostCSS
- **Linting**: ESLint 9 with Next.js and TypeScript configs
- **Fonts**: Geist (via `next/font`)

## Project Structure

```
hookhub/
├── app/
│   ├── layout.tsx          # Root layout with metadata and font setup
│   ├── page.tsx            # Home page component
│   └── globals.css         # Global Tailwind CSS imports
├── public/                 # Static assets
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
├── next.config.ts          # Next.js configuration
├── eslint.config.mjs       # ESLint configuration (flat config format)
├── postcss.config.mjs      # PostCSS configuration for Tailwind
└── README.md               # Original Next.js template README
```

## Key Configuration Notes

### TypeScript
- **Target**: ES2017 with DOM/ESNext libraries
- **Strict Mode**: Enabled
- **Path Alias**: `@/*` maps to the root of the project (e.g., `import { component } from '@/app/component'`)

### ESLint
Uses flat config format (ESLint 9+). Extends:
- `eslint-config-next/core-web-vitals` - Web Vitals recommendations
- `eslint-config-next/typescript` - TypeScript support

Ignored paths: `.next/`, `out/`, `build/`, `next-env.d.ts`

### Next.js Version Note
This project uses Next.js 16, which has breaking changes from older versions. Before using patterns or APIs from training data (especially older blog posts or examples), verify against the actual Next.js 16 documentation in `node_modules/next/dist/docs/`.

### Tailwind CSS v4
Uses the modern PostCSS integration with `@tailwindcss/postcss`. No `tailwind.config.js` file is needed for basic functionality—Tailwind auto-detects your templates.

## App Router Structure

This project uses Next.js App Router (in the `app/` directory), not the older Pages Router. Key points:
- `layout.tsx` files define layouts that wrap child pages
- `page.tsx` files are the actual page components
- Route segments map directly to the URL structure (e.g., `app/blog/page.tsx` → `/blog`)

## When Starting New Work

1. Ensure the dev server is running with `npm run dev`
2. Check that any new pages/components follow the App Router conventions
3. Use the `@/*` alias for imports to keep paths clean
4. Leverage Tailwind's utility classes for styling (no custom CSS needed in most cases)
5. Keep components in the `app/` directory unless a separate `components/` structure is added
