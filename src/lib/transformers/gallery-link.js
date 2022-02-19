import { visit } from "unist-util-visit";
import { h } from "hastscript";

export default () => {
  return (ast, file) => {
    if (file.data.hasGallery) {
      ast.children.push(h("script", { src: "/js/gallery.js", type: "module" }));
    }
  };
};
