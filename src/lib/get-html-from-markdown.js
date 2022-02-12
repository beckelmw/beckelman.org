import markdown from "../lib/markdown";
import getHtmlDocument from "../lib/get-html-document";

export default async (content, req, env) => {
  const { html, meta } = await markdown(content);
  const css = await env.CONTENT.get("css/site.css");
  const doc = await getHtmlDocument({ html, css, meta });
  return doc;
};
