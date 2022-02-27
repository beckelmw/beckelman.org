export default async (req, env) => {
  const filename = req.params.filename;
  const img = await env.CONTENT.get(`img/${filename}`, "stream");

  return new Response(img, {
    headers: {
      "Content-Type": "image/png", // Naive
      "Cache-Control":
        env.MODE === "production" ? "max-age=31536000, immutable" : "no-cache",
    },
  });
};
