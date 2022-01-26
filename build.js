import * as esbuild from "esbuild";

const mode = process.env.NODE_ENV?.toLowerCase() ?? "development";

console.log(`[Worker] Running esbuild in ${mode} mode`);

esbuild.build({
  entryPoints: ["./src/index.js"],
  bundle: true,
  sourcemap: true,
  format: "esm",
  conditions: ["worker"], // https://esbuild.github.io/api/#how-conditions-work
  minify: mode === "production",
  define: {
    "process.env.NODE_ENV": `"${mode}"`,
  },
  outfile: "dist/index.mjs", // .mjs is important for Cloudflare
});
