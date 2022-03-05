import { markdownTable } from "markdown-table";

export default (rows) => {
  const data = [Object.keys(rows[0]), ...rows.map((r) => Object.values(r))];
  return markdownTable(data);
};
