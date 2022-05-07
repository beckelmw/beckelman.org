import { missing } from "itty-router-extras";
import { render } from "preact-render-to-string";
import { Head } from "../templates/head";
import { Navigation } from "../templates/navigation";
import { Body } from "../templates/body";
import { WebVitals } from "../templates/web-vitals";

export default async (req, env, ctx) => {
  const path = new URL(req.url).pathname;
  const { readable, writable } = new TransformStream();

  const writer = writable.getWriter();
  const encoder = new TextEncoder();
  const manifest = await env.CONTENT.get("manifest.json", "json");
  const siteJson = await env.CONTENT.get("site.json", "json");

  if (!siteJson || !siteJson[path]) {
    return missing();
  }

  const { html, ...meta } = siteJson[path];

  async function write() {
    writer.write(encoder.encode(`<!DOCTYPE html><html lang="en">`));
    writer.write(encoder.encode(render(Head({ manifest, meta }))));
    writer.write(encoder.encode(`<body>`));
    writer.write(encoder.encode(render(Navigation({ manifest, meta }))));
    writer.write(encoder.encode(render(Body({ meta, content: html }))));
    writer.write(encoder.encode(WebVitals()));
    writer.write(encoder.encode(`</body></html>`));
    return writer.close();
  }

  ctx.waitUntil(write());

  return new Response(readable, {
    headers: { "Content-Type": "text/html;charset=utf8" },
  });
};
