import html from "../lib/html";

export const Navigation = ({ manifest }) => {
  return html`<header class="bg-blue-600 mb-8 print:hidden">
    <nav class="mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div
        class="w-full py-6 flex items-center justify-between border-b border-blue-500 lg:border-none"
      >
        <div class="flex items-center">
          <a href="/">
            <span class="sr-only">Bill Beckelman</span>
            <img
              width="40px"
              height="40px"
              class="h-10 w-auto"
              src="/${manifest["img/favicon.svg"]}"
              alt="Bill Beckelman"
            />
          </a>
          <div class="ml-4 space-x-4">
            <a
              href="/code"
              class="text-base font-medium text-white hover:text-blue-50"
            >
              Code
            </a>

            <a
              href="/flying"
              class="text-base font-medium text-white hover:text-blue-50"
            >
              Flying
            </a>

            <a
              href="/hikes"
              class="text-base font-medium text-white hover:text-blue-50"
            >
              Hiking
            </a>

            <a
              href="/recipes"
              class="text-base font-medium text-white hover:text-blue-50"
            >
              Recipes
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>`;
};
