import "dotenv/config";
import buildPointsGeojson from "./lib/build-points-geojson.js";
import githubUpload from "./lib/github-upload.js";
import getMetaByGlob from './lib/get-meta-by-glob.js';

const hikesMeta = await getMetaByGlob("hikes/**/*.md");

const geoJson = buildPointsGeojson(
  hikesMeta.filter((x) => x.latitude && x.longitude),
  (d) => ({ ...d })
);

await githubUpload("hikes/hikes.geojson", JSON.stringify(geoJson, null, 2));
