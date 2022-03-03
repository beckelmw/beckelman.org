export default (rows) => {
  const head = `<thead><tr>${Object.keys(rows[0])
    .map((key) => `<th>${key}</th>`)
    .join("")}</tr></thead>`;

  const body = `<tbody>${rows
    .map(
      (r) =>
        `<tr>${Object.values(r)
          .map((val) => `<td>${val}</td>`)
          .join("")}</tr>`
    )
    .join("")}</tbody>`;

  return `<table>
    ${head}
    ${body}
  </table>`;
};
