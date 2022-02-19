import { visit } from "unist-util-visit";
import { h, s } from "hastscript";

export default () => {
  return (ast, file) => {
    const url = file.data.meta.url;
    visit(
      ast,
      (x) => x.tagName === "wb-map",
      (node, idx, parent) => {
        file.data.hasMap = true;
        node.tagName = "wb-map";
        node.properties.accessToken = "3yQ7Mty4E4FBZlTVgzgo";
        node.properties.url = `${url}.geojson`;
      }
    );
  };
};
