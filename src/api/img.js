const getContentType = (filename) => {
  const ext = filename.split(".").pop();
  switch (ext) {
    case "png":
      return "image/png";
    case "svg":
      return "image/svg+xml";
    default:
      return "image/png";
  }
};

export default async (req, env) => {
  const filename = req.params.filename;
  const img = await env.CONTENT.get(`img/${filename}`, "stream");
  const contentType = getContentType(filename);

  return new Response(img, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control":
        env.MODE === "production" ? "max-age=31536000, immutable" : "no-cache",
    },
  });
};
