import { writeFile } from "fs/promises";
import { Plugin } from "vite";
import { featuresSchema } from "../data/features";
import { getDocsIndex } from "../data/docs";
import path from "path";
import chokidar from "chokidar";

function generateSchemaFiles() {
  writeFile("../../assets/schema/web/features.schema.json", JSON.stringify(featuresSchema));
}

async function generateIndexes() {
  writeFile("../../assets/content/docs.json", JSON.stringify(await getDocsIndex("../../assets/content/", "*/docs/**/*.mdx")));
}

async function generate() {
  console.log("Generating schema files and indexes.");
  generateSchemaFiles();
  generateIndexes();
}

export function watchContent(): Plugin {
  generate();
  return {
    name: "watch-content-plugin",
    configureServer() {
      const generateIndexesCallback = (path: string) => {
        console.log(path);
        path.includes("assets/content") && generateIndexes();
      };
      const watcher = chokidar.watch(path.resolve("../../assets/content/**/*.mdx"), { ignoreInitial: true });
      watcher.on("add", generateIndexesCallback);
      watcher.on("change", generateIndexesCallback);
      watcher.on("unlink", generateIndexesCallback);
    },
  };
}
