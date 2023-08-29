import Link from "next/link";
import { fetchGithubStars } from "../../../shared/fetch-github-stars";

export default async function Page({
  params,
}: {
  params: { repoName: string[] };
}) {
  const { name, stars } = await fetchGithubStars(params.repoName);
  return (
    <>
      <p>
        {name} has {stars} ⭐️
      </p>
      <Link href="/legacy/vercel/next.js">How about Next.js?</Link>
    </>
  );
}
