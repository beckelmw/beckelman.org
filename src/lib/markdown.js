import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { load as yaml } from "js-yaml";

export default async (markdown) => {
  let meta = {};
  const { value: html } = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(() => {
      return (ast) => {
        visit(
          ast,
          (x) => x.type === "yaml",
          (node, index, parent) => {
            meta = { ...meta, ...yaml(node.value) };
          }
        );
      };
    })
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw) // What allows raw html to work
    .use(rehypeStringify)
    .process(markdown);

  return { html, meta };
};
