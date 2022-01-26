export default async (url, env) => {
  const favicon = await env.CONTENT.get(url, "stream");
  return new Response(favicon, {
    "Content-Type": "image/png",
    "Cache-Control": "max-age=300",
  });
};
