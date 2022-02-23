import { readFile } from "fs/promises";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import frontmatter from "../src/lib/transformers/frontmatter.js";
import remarkStringify from "remark-stringify";
import getGardenFiles from "./lib/get-garden-files.js";
import buildPointsGeojson from "./lib/build-points-geojson.js";

const files = await getGardenFiles("hikes/**/*.md");

async function convert(content) {
  const { value: markdown, data } = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(frontmatter)
    .use(remarkStringify)
    .process(content);

  return { markdown, meta: data.meta };
}

const result = [];
for (const f of files) {
  const content = await readFile(f);
  const { meta } = await convert(content);

  result.push({
    ...meta,
  });
}

const geoJson = buildPointsGeojson(
  result.filter((x) => x.latitude && x.longitude),
  (d) => ({ ...d })
);

console.log(JSON.stringify(geoJson, null, 2));
