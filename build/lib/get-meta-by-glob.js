import { readFile } from "fs/promises";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import frontmatter from "../../src/lib/transformers/frontmatter.js";
import remarkStringify from "remark-stringify";
import getGardenFiles from "./get-garden-files.js";

async function convert(content) {
  const { value: markdown, data } = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(frontmatter)
    .use(remarkStringify)
    .process(content);

  return { markdown, meta: data.meta };
}

export default async (glob = "*/**") => {
  const result = [];
  const files = await getGardenFiles(glob);

  for (const f of files) {
    const content = await readFile(f);
    const { meta } = await convert(content);

    result.push({
      ...meta,
    });
  }

  return result;
};
