export default async (req, env) => {
  const sitemap = await env.CONTENT.get(`sitemap.txt`, "stream");

  return new Response(sitemap, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
