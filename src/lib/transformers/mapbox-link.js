import { visit } from "unist-util-visit";
import { h } from "hastscript";

export default ({ manifest }) => {
  return (ast, file) => {
    if (file.data.hasMap) {
      ast.children.push(
        h("script", { src: `/${manifest["js/map.js"]}`, type: "module" })
      );
    }
  };
};
