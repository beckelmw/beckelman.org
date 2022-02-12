import { missing, ThrowableRouter } from "itty-router-extras";
import favicon from "./api/favicon";
import map from "./api/map";
import search from "./api/search";
import content from "./api/content";
import geojson from "./api/geojson";

export const router = ThrowableRouter()
  .get("/favicon.png", favicon)
  .get("/js/map.js", map)
  .get("/search", search)
  .get("*.geojson", geojson)
  .get("*", content)
  .get("*", () => missing());

export default {
  fetch: router.handle,
};
