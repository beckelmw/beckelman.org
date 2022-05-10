import html from "../lib/html";

const Description = ({ description }) => {
  return (
    !!description && html`<meta name="description" content="${description}" />`
  );
};

const Favicon = ({ href }) => {
  return (
    !!href && html`<link rel="icon" type="image/svg+xml" href="${href}" />`
  );
};

const CSS = ({ include = true, href }) => {
  return include && html`<link rel="stylesheet" href="${href}" />`;
};

const Base = ({ url }) => {
  return html`<base href="${url || "/"}" />`;
};

const Script = ({ include = true, src }) => {
  return include && html`<script type="module" src="/${src}"></script>`;
};

export const Head = ({ meta, manifest, children }) => {
  return html`
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${meta.title || "Bill Beckelman"}</title>
      <${Description} description=${meta.description} />
      <${Base} url=${meta.baseUrl} />
      <${Favicon} href="/${manifest["img/favicon.svg"]}" />
      <${CSS} href="/${manifest["css/site.css"]}" />
      <${CSS}
        include=${!!meta.hasCode}
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/github-dark-dimmed.min.css"
      />
      <${Script} include=${!!meta.hasMap} src=${manifest["js/map.js"]} />
      <${Script} include=${!!meta.hasImages} src=${manifest["js/gallery.js"]} />
      ${children}
    </head>
  `;
};
