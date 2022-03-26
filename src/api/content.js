import { missing } from "itty-router-extras";
import start from "../templates/start.hbs";
import header from "../templates/header.hbs";
import body from "../templates/body.hbs";
import end from "../templates/end.hbs";
import webVitals from "../templates/web-vitals.hbs";

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
    writer.write(encoder.encode(start({ manifest, meta })));
    writer.write(encoder.encode(header({ meta })));
    writer.write(encoder.encode(body({ meta, html })));
    writer.write(encoder.encode(webVitals()));
    writer.write(encoder.encode(end()));
    return writer.close();
  }

  ctx.waitUntil(write());

  return new Response(readable, {
    headers: { "Content-Type": "text/html;charset=utf8" },
  });
};
