import { missing } from "itty-router-extras";
import { render } from "preact-render-to-string";
import { Head } from "../templates/head";
import { Navigation } from "../templates/navigation";
import { Body } from "../templates/body";
import { WebVitals } from "../templates/web-vitals";

export default async (req, env, ctx) => {
  const path = new URL(req.url).pathname;
  const manifest = await env.CONTENT.get("manifest.json", "json");
  const siteJson = await env.CONTENT.get("site.json", "json");

  if (!siteJson || !siteJson[path]) {
    return missing();
  }

  const { html: content, ...meta } = siteJson[path];

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();
  async function write() {
    writer.write(encoder.encode(`<!DOCTYPE html><html lang="en">`));
    writer.write(encoder.encode(render(Head({ manifest, meta }))));
    writer.write(encoder.encode(`<body>`));
    writer.write(encoder.encode(render(Navigation({ manifest, meta }))));
    writer.write(encoder.encode(render(Body({ meta, content }))));
    writer.write(encoder.encode(WebVitals()));
    writer.write(encoder.encode(`</body></html>`));
    return writer.close();
  }

  ctx.waitUntil(write());

  const headers = { "Content-Type": "text/html;charset=utf8" };

  if (meta.hasMap) {
    headers["link"] =
      '<https://api.maptiler.com>; rel="preconnect", <https://cdnjs.cloudflare.com>; rel="preconnect"';
  }

  return new Response(readable, {
    headers,
  });
};
