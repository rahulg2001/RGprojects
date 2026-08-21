import type { Hook } from "@/app/lib/github";

export function HookCard({ hook }: { hook: Hook }) {
  return (
    <a
      href={hook.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-3 rounded-xl border border-black/[.08] p-5 transition-colors hover:border-black/[.16] dark:border-white/[.145] dark:hover:border-white/[.25]"
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-semibold text-black dark:text-zinc-50">
          {hook.owner}/{hook.name}
        </h2>
        <span className="whitespace-nowrap rounded-full bg-black/[.06] px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-white/[.08] dark:text-zinc-300">
          {hook.category}
        </span>
      </div>
      <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
        {hook.description}
      </p>
      <div className="mt-auto flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
        <span aria-hidden>★</span>
        <span>{hook.stars.toLocaleString()}</span>
      </div>
    </a>
  );
}
