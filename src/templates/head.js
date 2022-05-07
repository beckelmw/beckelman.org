import html from "../lib/html";

export const Head = ({ meta, manifest }) => {
  const links = [
    meta.description &&
      html`<meta name="description" content="${meta.description}" />`,

    html`<link
      rel="icon"
      type="image/svg+xml"
      href="/${manifest["img/favicon.svg"]}"
    />`,

    html`<link rel="stylesheet" href="/${manifest["css/site.css"]}" />`,
    html`<base href="${meta.baseUrl || "/"}" />`,

    meta.hasCode &&
      html`<link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/github-dark-dimmed.min.css"
      />`,

    meta.hasMap &&
      html`<script type="module" src="/${manifest["js/map.js"]}"></script>`,

    meta.hasImages &&
      html`<script type="module" src="/${manifest["js/gallery.js"]}"></script>`,
  ].filter((x) => !!x);

  return html`
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${meta?.title || "Bill Beckelman"}</title>
      ${links.map((l) => html`${l}`)}
    </head>
  `;
};
