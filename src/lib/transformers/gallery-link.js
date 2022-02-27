import { visit } from "unist-util-visit";
import { h } from "hastscript";

export default ({ manifest }) => {
  return (ast, file) => {
    if (file.data.hasGallery) {
      ast.children.push(
        h("script", { src: `/${manifest["js/gallery.js"]}`, type: "module" })
      );
    }
  };
};
