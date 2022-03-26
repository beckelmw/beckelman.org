import {
  missing,
  ThrowableRouter,
  withParams
} from "itty-router-extras";
import img from "./api/img";
import javascript from "./api/javascript";
import css from "./api/css";
import search from "./api/search";
import content from "./api/content";
import geojson from "./api/geojson";
import analytics from "./api/analytics";
import robots from "./api/robots";
import sitemap from "./api/sitemap";
import webVitals from "./api/web-vitals";

export const router = ThrowableRouter()
  .get("/img/:filename", withParams, img)
  .get("/js/:filename", withParams, javascript)
  .get("/css/:filename", withParams, css)
  .get("/search", search)
  .get("/robots.txt", robots)
  .get("/sitemap.txt", sitemap)
  .all("/web-vitals", webVitals)
  .get("*.geojson", geojson)
  .all("*", analytics)
  .get("*", content)
  .get("*", () => missing());

export default {
  fetch: router.handle,
};
