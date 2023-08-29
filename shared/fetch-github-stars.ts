import { trace } from "@opentelemetry/api";

export const watchList = new Map<string, boolean>([
  ["vercel/next.js", true],
  ["BarryThePenguin/jonno.dev", true],
]);

export function validateRepoName(value: string[] | string | undefined) {
  let repoName = value ?? "unknown";

  if (Array.isArray(repoName)) {
    repoName = repoName.join("/");
  }

  if (!watchList.has(repoName)) {
    throw new Error("Invalid repo name");
  }

  return repoName;
}

export async function fetchGithubStars(value: string[] | string | undefined) {
  return await trace
    .getTracer("nextjs-example")
    .startActiveSpan("fetchGithubStars", async (span) => {
      try {
        const repoName = validateRepoName(value);

        const res = await fetch(`https://api.github.com/repos/${repoName}`, {
          next: {
            revalidate: 0,
          },
        });
        const data = await res.json();
        return {
          name: data.name,
          stars: data.stargazers_count,
        };
      } finally {
        span.end();
      }
    });
}
