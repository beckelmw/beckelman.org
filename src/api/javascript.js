export default async (req, env) => {
  const filename = req.params.filename;

  const js = await env.CONTENT.get(`js/${filename}`, "stream");

  return new Response(js, {
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control":
        env.MODE === "production" ? "max-age=31536000, immutable" : "no-cache",
    },
  });
};
