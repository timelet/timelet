import react from "@vitejs/plugin-react";
import ssr from "vike/plugin";
import mdx from "@mdx-js/rollup";
import { UserConfig } from "vite";
import { watchAndRun } from "vite-plugin-watch-and-run";
import path from "path";
import { featuresSchema } from "./data/features";
import { writeFile } from "fs/promises";
import remarkFrontmatter from "remark-frontmatter";

function generateSchemaFiles() {
  writeFile("../../assets/schema/web/features.schema.json", JSON.stringify(featuresSchema));
}

const config: UserConfig = {
  server: {
    port: 3002,
  },
  plugins: [
    react(),
    ssr({ prerender: true }),
    mdx({ remarkPlugins: [remarkFrontmatter] }),
    watchAndRun([{ watch: path.resolve("data/**/*.ts"), watchKind: ["add", "change"], run: generateSchemaFiles }]),
  ],
};

generateSchemaFiles();

export default config;
