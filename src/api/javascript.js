export default async (req, env) => {
  const filename = req.params.filename;
  const map = await env.CONTENT.get(`js/${filename}`, "stream");
  return new Response(map, {
    headers: { "Content-Type": "application/javascript" },
  });
};
