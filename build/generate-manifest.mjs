import { readFile } from "fs/promises";
import { resolve, basename, dirname } from "path";
import hasha from "hasha";
import got from "got";

const {
  MODE,
  CLOUDFLARE_API_URL,
  CLOUDFLARE_ACCOUNT_ID,
  CONTENT_KV_ID,
  CONTENT_KV_ID_PREVIEW,
  CLOUDFLARE_API_KEY,
} = process.env;

const isProduction = MODE === "production";

console.log(isProduction ? "Production build" : "Development build");

const files = {
  "img/favicon.svg": "src/img/favicon.svg",
  "js/map.js": "src/js/map.js",
  "css/site.css": "dist/site.css",
  "js/gallery.js": "src/js/gallery.js",
};

const kvPut = (keyName, opts) => {
  console.log(`Uploading ${keyName}`);
  const namespace = isProduction ? CONTENT_KV_ID : CONTENT_KV_ID_PREVIEW;
  try {
    return got.put(
      `${CLOUDFLARE_API_URL}accounts/${CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${namespace}/values/${keyName}`,
      {
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
        },
        ...opts,
      }
    );
  } catch (err) {
    console.error(err.response);
    process.exit(-1);
  }
};

for (const key of Object.keys(files)) {
  const file = files[key];
  const fileContents = await readFile(resolve(process.cwd(), file));
  const hash = await hasha.async(fileContents, { algorithm: "md5" });
  const directoryName = dirname(key);
  const filename = isProduction
    ? `${directoryName}/${hash}-${basename(file)}`
    : `${directoryName}/${basename(file)}`;

  files[key] = filename;

  await kvPut(`${filename}`, {
    body: fileContents,
  });
}

const manifest = JSON.stringify(files, null, 2);
await kvPut("manifest.json", { body: manifest });
