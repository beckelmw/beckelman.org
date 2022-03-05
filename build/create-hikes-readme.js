import "dotenv/config";
import buildTable from "./lib/build-table.js";
import getMetaByGlob from "./lib/get-meta-by-glob.js";
import githubUpload from "./lib/github-upload.js";
import sortBy from "./lib/sort-by.js";
import groupBy from "./lib/group-by.js";
import pipe from "./lib/pipe.js";

const meta = await getMetaByGlob("hikes/**/*.md");

const onlyHikes = (arr) => arr.filter((x) => x.latitude && x.longitude);

const mapData = (arr) =>
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

const buildMarkdownTables = (sections) =>
  Object.keys(sections)
    .map((section) => `### ${section}\n\n${buildTable(sections[section])}`)
    .join("\n\n");

const tables = pipe(
  onlyHikes,
  mapData,
  sortBy("Name"),
  groupBy("Location"),
  buildMarkdownTables
)(meta);

const md = `---
title: Hiking
url: /hikes
---

<wb-map url="/hikes/hikes.geojson"></wb-map>

${tables}

`;

await githubUpload("hikes/readme.md", md);
