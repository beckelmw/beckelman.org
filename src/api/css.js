export default async (req, env) => {
  const filename = req.params.filename;

  const css = await env.CONTENT.get(`css/${filename}`, "stream");

  return new Response(css, {
    headers: {
      "Content-Type": "text/css",
      "Cache-Control":
        env.MODE === "production" ? "max-age=31536000, immutable" : "no-cache",
    },
  });
};
