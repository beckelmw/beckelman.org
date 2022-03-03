import "dotenv/config";
import buildTable from "./lib/build-table.js";
import getMetaByGlob from "./lib/get-meta-by-glob.js";
import githubUpload from "./lib/github-upload.js";

const hikesMeta = await getMetaByGlob("hikes/**/*.md");

const rows = hikesMeta
  .filter((x) => x.latitude && x.longitude)
  .map(
    ({ title, url, type, difficulty, distance, elevationGain, fee, dogs }) => {
      return {
        Name: `<a href="${url}.md">${title}</a>`,
        Type: type,
        Difficulty: difficulty?.toUpperCase(),
        Distance: distance,
        "Elevation Gain": elevationGain,
        Fee: fee ? "Yes" : "No",
        Dogs: dogs ? "Yes" : "No",
      };
    }
  )
  .sort((a, b) => {
    if (a.Name > b.Name) return 1;
    if (a.Name < b.Name) return -1;
    return 0;
  });

const tbl = buildTable(rows);

const md = `---
title: Hiking
url: /hikes
---

<wb-map url="/hikes/hikes.geojson"></wb-map>

${tbl}
`;

await githubUpload("hikes/readme.md", md);
