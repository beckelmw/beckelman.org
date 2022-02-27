import { missing, ThrowableRouter, withParams } from "itty-router-extras";
import img from "./api/img";
import javascript from "./api/javascript";
import css from "./api/css";
import search from "./api/search";
import content from "./api/content";
import geojson from "./api/geojson";

export const router = ThrowableRouter()
  .get("/img/:filename", withParams, img)
  .get("/js/:filename", withParams, javascript)
  .get("/css/:filename", withParams, css)
  .get("/search", search)
  .get("*.geojson", geojson)
  .get("*", content)
  .get("*", () => missing());

export default {
  fetch: router.handle,
};
