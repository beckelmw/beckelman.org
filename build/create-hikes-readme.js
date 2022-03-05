import "dotenv/config";
import buildTable from "./lib/build-table.js";
import getMetaByGlob from "./lib/get-meta-by-glob.js";
import githubUpload from "./lib/github-upload.js";

const hikesMeta = await getMetaByGlob("hikes/**/*.md");

const rows = hikesMeta
  .filter((x) => x.latitude && x.longitude)
  .map(
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
  )
  .sort((a, b) => {
    if (a.Name > b.Name) return 1;
    if (a.Name < b.Name) return -1;
    return 0;
  });

const sections = rows.reduce((acc, cur) => {
  acc[cur.Location] = acc[cur.Location] || [];
  const { Location, ...rest } = cur;
  acc[cur.Location].push(rest);
  return acc;
}, {});

const areas = Object.keys(sections)
  .sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  })
  .map((s) => {
    return `### ${s}\n\n${buildTable(sections[s])}`;
  })
  .join("\n\n");

const md = `---
title: Hiking
url: /hikes
---

<wb-map url="/hikes/hikes.geojson"></wb-map>

${areas}

`;

await githubUpload("hikes/readme.md", md);
