import "dotenv/config";
import { writeFile } from "fs/promises";
import { resolve } from "path";
import got from "got";

const {
  CLOUDFLARE_API_URL,
  CLOUDFLARE_ACCOUNT_ID,
  CONTENT_KV_ID,
  CLOUDFLARE_API_KEY,
} = process.env;

const kvGet = (keyName, opts) => {
  console.log(`Downloading ${keyName}`);
  try {
    return got
      .get(
        `${CLOUDFLARE_API_URL}accounts/${CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${CONTENT_KV_ID}/values/${keyName}`,
        {
          headers: {
            Authorization: `Bearer ${CLOUDFLARE_API_KEY}`,
          },
          ...opts,
        }
      )
      .buffer();
  } catch (err) {
    console.error(err.response);
    process.exit(-1);
  }
};

async function download(filename) {
  return kvGet(filename).then((content) => {
    return writeFile(
      resolve(process.cwd(), `.mf/kv/CONTENT/${filename}`),
      content,
      "utf-8"
    );
  });
}

await download("site.json");
await download("search.json");
