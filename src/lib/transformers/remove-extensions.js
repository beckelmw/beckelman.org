import { visit } from "unist-util-visit";

export default () => {
  return (ast) => {
    visit(
      ast,
      (x) => x.tagName === "a",
      (node) => {
        node.properties.href = node.properties.href.replace(/\.md$/, "");
      }
    );
  };
};
