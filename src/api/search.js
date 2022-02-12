import MiniSearch from "minisearch";

export default async (req, env) => {
  console.log(req.q);

  const url = new URL(req.url);

  const query = url.searchParams.get("q");

  if (!query) {
    return { body: "q is a required search parameter", status: 400 };
  }

  const documents = await env.CONTENT.get("search-index.json", "json");

  const miniSearch = new MiniSearch({
    fields: ["title", "text"], // fields to index for full-text search
    storeFields: ["title", "url"], // fields to return with search results
  });

  miniSearch.addAll(documents);

  const autoSuggest = url.searchParams.get("autoSuggest");

  const results = autoSuggest
    ? miniSearch.autoSuggest(query)
    : miniSearch.search(query);

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
};
