export type Category =
  | "Formatting"
  | "Security / Guardrails"
  | "Notifications"
  | "Logging & Observability"
  | "Testing"
  | "Git & Version Control"
  | "Productivity / Other";

export type CuratedHook = {
  repo: string; // "owner/name"
  category: Category;
};

export const curatedHooks: CuratedHook[] = [
  { repo: "disler/claude-code-hooks-mastery", category: "Logging & Observability" },
  { repo: "johnlindquist/claude-hooks", category: "Productivity / Other" },
  { repo: "decider/claude-hooks", category: "Security / Guardrails" },
  { repo: "karanb192/claude-code-hooks", category: "Productivity / Other" },
];
