export default async ({ html, css, meta }) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta?.title || "Bill Beckelman"}</title>
  <link rel="icon" type="image/png" href="/favicon.png" />
  <style>${css || ""}</style>
</head>
<body>
  <header class="bg-blue-600 mb-8 print:hidden">
    <nav class="mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="w-full py-6 flex items-center justify-between border-b border-blue-500 lg:border-none">
        <div class="flex items-center">
          <a href="/">
            <span class="sr-only">Bill Beckelman</span>
            <img width="40px" class="h-10 w-auto" src="/favicon.png" alt="Bill Beckelman">
          </a>
          <div class="ml-4 space-x-4">
            <a href="/code" class="text-base font-medium text-white hover:text-blue-50">
              Code
            </a>

            <a href="/flying" class="text-base font-medium text-white hover:text-blue-50">
              Flying
            </a>

            <a href="/hikes" class="text-base font-medium text-white hover:text-blue-50">
              Hiking
            </a>

            <a href="/recipes" class="text-base font-medium text-white hover:text-blue-50">
              Recipes
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <main class="container mx-auto p-4 md:p-0">
    <div class="prose prose-slate max-w-none lg:prose-lg">
      ${getTitle(meta)}
      ${getStatus(meta)}
      ${html}
    </div>
  </main>
</body>
</html>`;
};

function getTitle(meta) {
  if (!meta?.title) {
    return "";
  }
  return `
  <div class="flex justify-between w-full">
    <h1 class="mb-0 lg:mb-0">${meta.title}</h1>
    <div class="print:hidden">
      <div class="cursor-pointer" onclick="window.print()">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </div>`;
}

function getStatus(meta) {
  if (!meta?.status) {
    return "";
  }
  return `<div class="inline-flex items-center justify-center px-2 py-1 mr-2 bg-blue-500 rounded-full">
  <a class="uppercase no-underline text-xs font-bold leading-none text-white" href="/code/digital-gardening">${meta.status}</a>
  </div>`;
}
