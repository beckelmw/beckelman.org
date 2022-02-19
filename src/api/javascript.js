export default async (req, env) => {
  const map = await env.CONTENT.get(`js/${req.params.filename}`, "stream");
  return new Response(map, {
    headers: { "Content-Type": "application/javascript" },
  });
};
