export default async (req, env) => {
  const favicon = await env.CONTENT.get("img/favicon.png", "stream");
  return new Response(favicon, { headers: { "Content-Type": "image/png" } });
};
