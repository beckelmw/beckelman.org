import { visit } from "unist-util-visit";
import { load as yaml } from "js-yaml";

export default () => {
  return (ast, file) => {
    file.data.meta = file.data.meta || {};

    visit(
      ast,
      (x) => x.type === "yaml",
      (node, index, parent) => {
        file.data.meta = { ...yaml(node.value) };
      }
    );
  };
};
