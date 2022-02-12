import getContent from "../lib/get-content";

const GEOJSON = "application/geo+json";

export default async (req, env) => {
  const content = await getContent(req, env);

  if (!content) return;

  return new Response(content, {
    headers: { "Content-Type": GEOJSON },
  });
};
