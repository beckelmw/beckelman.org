export default async (req, env) => {
  const map = await env.CONTENT.get("js/map.js", "stream");
  return new Response(map, {
    headers: { "Content-Type": "application/javascript" },
  });
};
