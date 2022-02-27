import { missing } from "itty-router-extras";
import getContent from "../lib/get-content";
import hash from "../lib/hash";

const GEOJSON = "application/geo+json";

export default async (req, env) => {
  const content = await getContent(req, env);

  if (!content) {
    return missing();
  }

  const ifNoneMatch = req.headers.get("If-None-Match");
  const etag = await hash(content);

  if (ifNoneMatch === etag) {
    return new Response(null, { status: 304 });
  }

  return new Response(content, {
    headers: {
      "Content-Type": GEOJSON,
      etag,
      "max-age": 60,
      "stale-while-revalidate": 300,
    },
  });
};
