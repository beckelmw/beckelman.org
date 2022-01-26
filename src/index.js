import getContent from "./lib/get-content";
import markdown from "./lib/markdown";
import getHtmlDocument from "./lib/get-html-document";
import send404 from "./lib/404";
import sendPng from "./lib/png";

export default {
  fetch: async (request, env, ctx) => {
    if (/\/favicon.png/.test(request.url)) {
      return sendPng("img/favicon.png", env);
    }

    const content = await getContent(request, env);

    if (!content) {
      return send404();
    }

    const { html, meta } = await markdown(content);
    const css = await env.CONTENT.get("css/site.css");
    const doc = await getHtmlDocument({ html, css, meta });

    return new Response(doc, {
      headers: { "Content-Type": "text/html" },
    });
  },
};
