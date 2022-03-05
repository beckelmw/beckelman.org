import "dotenv/config";
import buildTable from "./lib/build-table.js";
import getMetaByGlob from "./lib/get-meta-by-glob.js";
import githubUpload from "./lib/github-upload.js";
import sortBy from "./lib/sort-by.js";
import groupBy from "./lib/group-by.js";
import pipe from "./lib/pipe.js";

const hikesMeta = await getMetaByGlob("hikes/**/*.md");
const sortByName = sortBy("Name");
const sortByString = sortBy();
const groupByLocation = groupBy("Location");

const onlyHikes = (arr) => arr.filter((x) => x.latitude && x.longitude);

const formatData = (arr) =>
  arr.map(
    ({
      title,
      url,
      location,
      type,
      difficulty,
      distance,
      elevationGain,
      fee,
      dogs,
    }) => {
      return {
        Name: `[${title}](${url})`,
        Location: location,
        Type: type,
        Difficulty: difficulty?.toUpperCase(),
        Distance: distance,
        "Elevation Gain": elevationGain,
        Fee: fee ? "Yes" : "No",
        Dogs: dogs ? "Yes" : "No",
      };
    }
  );

const sections = pipe(
  onlyHikes,
  formatData,
  sortByName,
  groupByLocation
)(hikesMeta);

const areas = sortByString(Object.keys(sections))
  .map((s) => `### ${s}\n\n${buildTable(sections[s])}`)
  .join("\n\n");

const md = `---
title: Hiking
url: /hikes
---

<wb-map url="/hikes/hikes.geojson"></wb-map>

${areas}

`;

await githubUpload("hikes/readme.md", md);
