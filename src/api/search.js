import MiniSearch from "minisearch";
import getContent from "../lib/get-content.js";

export default async (req, env) => {
  const url = new URL(req.url);

  const query = url.searchParams.get("q");

  if (!query) {
    return { body: "q is a required search parameter", status: 400 };
  }

  const content = await getContent(
    {
      url: "https://example.com/search.json",
    },
    env
  );
  const documents = JSON.parse(content);

  const miniSearch = new MiniSearch({
    idField: "url",
    fields: ["title", "text", "url"], // fields to index for full-text search
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
