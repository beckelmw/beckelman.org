import markdown from "../lib/markdown";
import getHtmlDocument from "../lib/get-html-document";

export default async (content, req, env) => {
  const { html, meta } = await markdown(content);
  const css = await env.CONTENT.get("css/site.css");

  // This probably needs to go somewhere else
  const url = new URL(req.url);
  if (!/\/$/.test(url.pathname)) {
    meta.baseUrl = `${url.pathname}/`;
  }

  const doc = await getHtmlDocument({ html, css, meta });
  return doc;
};
