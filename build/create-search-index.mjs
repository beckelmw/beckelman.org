import { globby } from "globby";
import { resolve } from "path";
import { homedir } from "os";
import { readFile } from "fs/promises";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";
import { remove } from "unist-util-remove";
import frontmatter from "../src/lib/transformers/frontmatter.js";

const files = await globby(
  resolve(homedir(), "projects/digital-garden/**/*.md")
);

const removeYaml = () => {
  return (ast) => {
    remove(ast, "yaml");
  };
};

async function convert(content) {
  const { value: markdown, data } = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(frontmatter)
    .use(removeYaml)
    .use(remarkGfm)
    .use(remarkStringify)
    .process(content);

  return { markdown, meta: data.meta };
}

const result = [];
for (const f of files) {
  const content = await readFile(f);
  const { markdown, meta } = await convert(content);

  result.push({
    title: meta.title,
    text: markdown,
    url: meta.url,
  });
}

console.log(JSON.stringify(result, null, 2));
