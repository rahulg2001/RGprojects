import { curatedHooks } from "@/app/data/hooks";
import { fetchAllHooks } from "@/app/lib/github";
import { HookGrid } from "@/app/components/hook-grid";

export default async function Home() {
  const hooks = await fetchAllHooks(curatedHooks);

  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-5xl flex-1 flex-col gap-8 bg-white px-6 py-16 dark:bg-black sm:px-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            HookHub
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Discover cool, open-source Claude Code hooks.
          </p>
        </div>
        <HookGrid hooks={hooks} />
      </main>
    </div>
  );
}
