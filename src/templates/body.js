import html from "../lib/html";

const Title = ({ title, banner }) => {
  if (!title) return null;

  const bannerTitle = html`<div class="absolute inset-0 not-prose">
      <img class="w-full h-full object-cover" src="${banner}" alt="" />
    </div>
    <div class="relative mx-auto px-4 pt-8 pb-40 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-extrabold tracking-tight text-white">
        ${title}
      </h1>
    </div>`;

  const nonBannerTitle = html`<div class="relative mx-auto">
    <h1 class="text-4xl font-extrabold tracking-tight text-black">${title}</h1>
  </div>`;

  return html`<div class="relative mb-12">
    ${banner ? bannerTitle : nonBannerTitle}
  </div>`;
};

const Status = ({ status }) => {
  if (!status) return null;

  return html`<div
    class="inline-flex items-center justify-center px-2 py-1 mr-2 bg-blue-500 rounded-full"
  >
    <a
      class="uppercase no-underline text-xs font-bold leading-none text-white"
      href="/code/digital-gardening"
      >${status}</a
    >
  </div>`;
};

export const Body = ({ meta, content }) => {
  return html`<main class="container mx-auto p-4 md:p-0">
    <div class="prose prose-slate max-w-none lg:prose-lg">
      <${Title} ...${meta} />
      <${Status} ...${meta} />
      <div dangerouslySetInnerHTML=${{ __html: content }}></div>
    </div>
  </main>`;
};
