import Link from "next/link";
import { fetchGithubStars } from "../../shared/fetch-github-stars";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const { name, stars } = await fetchGithubStars(params?.repoName);

  return {
    props: {
      name,
      stars,
    },
  };
}

export default function IndexPage({
  name,
  stars,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <p>
        {name} has {stars} ⭐️
      </p>
      <Link href="/repo/vercel/next.js">How about Next.js?</Link>
    </>
  );
}
