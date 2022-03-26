import { createClient } from "@supabase/supabase-js";

export default async (req, env, ctx) => {
  const url = new URL(req.url).pathname;

  if (/localhost/.test(url)) {
    return;
  }

  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
    fetch: (...args) => fetch(...args),
  });

  const useragent = req.headers.get("user-agent");

  await supabase
    .from("analytics")
    .insert([{ url, country: req.cf?.country, useragent }]);
};
