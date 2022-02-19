import { selectAll } from "unist-util-select";
import { visit } from "unist-util-visit";

export default () => {
  return (ast, file) => {
    visit(
      ast,
      (x) => x.tagName === "ul",
      (node) => {
        const images = selectAll("element", node).filter(
          (y) => y.tagName === "img"
        );

        if (images.length) {
          file.data.hasGallery = true;
          node.tagName = "wb-gallery";
          node.children = images;
          node.properties.replacements = "330width:public";
        }
      }
    );
  };
};
