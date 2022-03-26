export default async (req) => {
  const txt = `Sitemap: https://beckelman.org/sitemap.txt`;
  return new Response(txt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
