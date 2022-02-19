import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import frontmatter from "./transformers/frontmatter";
import imageMeta from "./transformers/image-meta";
import processImageList from "./transformers/process-image-list";
import mapbox from './transformers/mapbox';
import mapboxLink from './transformers/mapbox-link';
import galleryLink from './transformers/gallery-link';

export default async (markdown) => {
  const { value: html, data } = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(frontmatter)
    .use(imageMeta)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw) // What allows raw html to work
    .use(processImageList)
    .use(galleryLink)
    .use(mapbox)
    .use(mapboxLink)
    .use(rehypeStringify)
    .process(markdown);

  return {
    html,
    meta: data.meta,
  };
};
