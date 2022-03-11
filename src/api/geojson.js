import { missing } from "itty-router-extras";
import hash from "../lib/hash";

const GEOJSON = "application/geo+json";

export default async (req, env) => {
  const url = new URL(req.url).pathname;
  const allGeojson = await env.CONTENT.get("geojson.json", "json");

  if (!allGeojson || !allGeojson[url]) {
    return missing();
  }

  const content = JSON.stringify(allGeojson[url]);
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
