import getContent from "../lib/get-content";
import getHtmlFromMarkdown from "../lib/get-html-from-markdown";

const GEOJSON = "application/geo+json";

export default async (req, env) => {
  const content = await getContent(req, env);

  if (!content) return;

  const accept = req.headers.get("accept");

  switch (accept) {
    case GEOJSON:
      return new Response(JSON.stringify({}), {
        headers: { "Content-Type": GEOJSON },
      });
    default:
      const html = await getHtmlFromMarkdown(content, req, env);
      return new Response(html, { headers: { "Content-Type": "text/html" } });
  }
};
