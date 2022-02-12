import { visit } from "unist-util-visit";
import { h } from "hastscript";

export default () => {
  return (ast, file) => {
    if (file.data.hasMap) {
      ast.children.push(h("script", { src: "/js/map.js", type: "module" }));
    }
  };
};
