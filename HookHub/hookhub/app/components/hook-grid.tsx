import type { Hook } from "@/app/lib/github";
import { HookCard } from "@/app/components/hook-card";

export function HookGrid({ hooks }: { hooks: Hook[] }) {
  if (hooks.length === 0) {
    return (
      <p className="text-center text-zinc-600 dark:text-zinc-400">
        No hooks available right now. Check back soon.
      </p>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {hooks.map((hook) => (
        <HookCard key={hook.repo} hook={hook} />
      ))}
    </div>
  );
}
