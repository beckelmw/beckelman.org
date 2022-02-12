import { visit } from "unist-util-visit";

export default () => {
  return (ast, file) => {
    file.data.meta = file.data.meta || {};

    file.data.meta.images = file.data.meta.images || [];

    visit(
      ast,
      (x) => x.type === "image",
      (node) => {
        if (!/ from /.test(node.alt)) return;
        
        file.data.meta.images.push({
          url: node.url,
          latLng: node.alt
            .replace(/.*from\s(.*),(.*)/, "$1, $2")
            .split(",")
            .map((x) => +x),
        });
      }
    );
  };
};
