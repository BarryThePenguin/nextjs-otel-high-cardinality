import Link from "next/link";
import { watchList } from "../shared/fetch-github-stars";

export default function Page() {
  return (
    <ul>
      {Array.from(watchList).map(([repo, stars]) => (
        <li key={repo}>
          <Link href={`/legacy/${repo}`}>{repo}</Link>
        </li>
      ))}
    </ul>
  );
}
