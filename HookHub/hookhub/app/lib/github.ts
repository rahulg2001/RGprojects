import type { Category } from "@/app/data/hooks";

export type Hook = {
  repo: string;
  category: Category;
  name: string;
  description: string;
  htmlUrl: string;
  stars: number;
  owner: string;
};

type GitHubRepoResponse = {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  owner: { login: string };
};

export async function fetchHook(
  curated: { repo: string; category: Category }
): Promise<Hook | null> {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${curated.repo}`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return null;
    }

    const data: GitHubRepoResponse = await res.json();

    return {
      repo: curated.repo,
      category: curated.category,
      name: data.name,
      description: data.description ?? "No description provided.",
      htmlUrl: data.html_url,
      stars: data.stargazers_count,
      owner: data.owner.login,
    };
  } catch {
    return null;
  }
}

export async function fetchAllHooks(
  curatedHooks: { repo: string; category: Category }[]
): Promise<Hook[]> {
  const results = await Promise.all(curatedHooks.map(fetchHook));
  return results.filter((hook): hook is Hook => hook !== null);
}
