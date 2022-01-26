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

            <a href="/hiking" class="text-base font-medium text-white hover:text-blue-50">
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
      ${(meta.title && `<h1 class="mb-0 lg:mb-0">${meta.title}</h1>`) || ""}
      ${getStatus(meta)}
      ${html}
    </div>
  </main>
</body>
</html>`;
};

function getStatus(meta) {
  if (!meta.status) {
    return "";
  }
  return `<div class="inline-flex items-center justify-center px-2 py-1 mr-2 bg-blue-500 rounded-full">
  <a class="uppercase no-underline text-xs font-bold leading-none text-white" href="/code/digital-gardening">${meta.status}</a>
  </div>`;
}
