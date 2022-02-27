import markdown from "../lib/markdown";
import getHtmlDocument from "../lib/get-html-document";

export default async (content, req, env) => {
  const manifest = await env.CONTENT.get("manifest.json", 'json');

  const { html, meta } = await markdown(content, manifest);

  // This probably needs to go somewhere else
  const url = new URL(req.url);
  if (!/\/$/.test(url.pathname)) {
    meta.baseUrl = `${url.pathname}/`;
  }

  const doc = await getHtmlDocument({ html, manifest, meta });
  return doc;
};
