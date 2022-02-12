import { selectAll } from "unist-util-select";
import { visit } from "unist-util-visit";

export default () => {
  return (ast, file) => {
    visit(
      ast,
      (x) => x.tagName === "ul",
      (node) => {
        const images = selectAll("element", node)
          .filter((y) => y.tagName === "img")
          .map((i) => {
            i.properties.loading = "lazy";
            return i;
          });
        if (images.length) {
          file.data.hasGallery = true;
          node.tagName = "div";
          node.children = images;
        }
      }
    );
  };
};
