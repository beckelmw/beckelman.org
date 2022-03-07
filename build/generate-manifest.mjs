import "dotenv/config";
import { readFile, writeFile, mkdir } from "fs/promises";
import { resolve, basename, dirname } from "path";
import hasha from "hasha";
import got from "got";

const {
  MODE,
  CLOUDFLARE_API_URL,
  CLOUDFLARE_ACCOUNT_ID,
  CONTENT_KV_ID,
  CLOUDFLARE_API_KEY,
} = process.env;

const isProduction = MODE === "production";

const files = {
  "img/favicon.png": "src/img/favicon.png",
  "js/map.js": "src/js/map.js",
  "css/site.css": isProduction
    ? "dist/site.css"
    : ".mf/kv/CONTENT/css/site.css",
  "js/gallery.js": "src/js/gallery.js"
};

const directory = isProduction ? "dist" : ".mf/kv/CONTENT";

const kvPut = (keyName, opts) => {
  console.log(`Uploading ${keyName}`);
  try {
    return got.put(
      `${CLOUDFLARE_API_URL}accounts/${CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${CONTENT_KV_ID}/values/${keyName}`,
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

  if (MODE !== "production") {
    console.log(`${directory}/${filename}`);
    await mkdir(dirname(`${directory}/${filename}`), { recursive: true });
    await writeFile(`${directory}/${filename}`, fileContents);
  } else {
    await kvPut(`${filename}`, {
      body: fileContents,
    });
  }
}

const manifest = JSON.stringify(files, null, 2);
if (MODE !== "production") {
  await writeFile(`${directory}/manifest.json`, manifest);
} else {
  await kvPut("manifest.json", { body: manifest });
}
