import { NextApiRequest, NextApiResponse } from "next";
import { fetchGithubStars } from "../../../shared/fetch-github-stars";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, stars } = await fetchGithubStars(req.query.repoName);
  res.status(200).json({ name, stars });
}
