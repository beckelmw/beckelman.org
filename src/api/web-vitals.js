import { createClient } from "@supabase/supabase-js";
import { status } from "itty-router-extras";

export default async (req, env) => {
  const referer = req.headers.get("referer");
  const url = new URL(referer).pathname;

  if (/localhost/.test(url)) {
    return;
  }

  const useragent = req.headers.get("user-agent");

  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
    fetch: (...args) => fetch(...args),
  });

  const { name, value } = await req.json();

  await supabase
    .from("web-vitals")
    .insert([{ url, country: req.cf?.country, useragent, name, value }]);

  return status(202);
};
