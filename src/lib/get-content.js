import { fromBase64 } from "./encoding";

function getUrl(request) {
  const path = new URL(request.url).pathname;

  if (["/", "/code", "/flying", "/hikes", "/recipes"].includes(path)) {
    return `${path.replace(/^\//, "")}/readme.md`;
  }
  return /\.(.*){3,7}$/.test(path) ? path : `${path}.md`;
}

export default async (request, env) => {
  const path = getUrl(request);
  const cache = env.CONTENT;
  const cacheKey = `github:${path.replace(/\//g, ":").toLowerCase()}`;
  const cachedItem = await cache.get(cacheKey, "json");

  const headers = new Headers({
    authorization: `token ${env.GITHUB_TOKEN}`,
    accept: "application/vnd.github.v3+json",
    "User-Agent": "beckelman.org", // GITHUB will send 403 without UserAgent
  });

  if (cachedItem?.etag) {
    headers.append("If-None-Match", cachedItem.etag);
  }

  const res = await fetch(
    `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents${path}`,
    {
      headers,
    }
  );

  if (res.status === 304) {
    return cachedItem?.content;
  }

  if (res.status === 404) {
    await cache.delete(cacheKey);
    return null;
  }

  if (res.ok) {
    const etag = res.headers.get("etag");
    const { content, sha } = await res.json();
    const newContent = { path, content: fromBase64(content), sha };
    newContent.etag = etag;

    await cache.put(cacheKey, JSON.stringify(newContent));
    return newContent.content;
  }

  return cachedItem?.content ? cachedItem.content : null;
};
