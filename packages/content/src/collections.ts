import { CollectionRegistration, Collection, defaultCollectionOptions } from "./types";
import glob from "fast-glob";
import { determineFileType } from "./utils/path";
import { getCollectionPipeline, getContentPipeline } from "./pipeline";
import { getConfiguration } from "./configuration";
import { join } from "node:path";
import { FSWatcher, watch } from "chokidar";
import fs from "node:fs/promises";

const config = getConfiguration();
let collections: Collection[] = [];
const watchers: Record<string, FSWatcher> = {};

export async function registerCollection(registration: CollectionRegistration) {
  if (collections.find((c) => c.name === registration.name)) throw new Error("Collection with this name already exists");

  const options = { ...defaultCollectionOptions, ...registration.options };
  const path = join(registration.basePath, registration.globPath);
  const files = await glob(path);
  if (files.length === 0) throw new Error("No files found");

  const collection: Collection = {
    name: registration.name,
    basePath: registration.basePath,
    searchPath: path,
    contents: files
      .map((file) => {
        const type = determineFileType(file);
        return { file, type, url: file };
      })
      .filter((content) => {
        if (content.type === "unknown") console.warn(`Ignoring file because of unknown file type: ${content.file}`);
        return content.type !== "unknown";
      }),
  };

  if (options.render && config.outputPath) {
    collection.outputPath = config.outputPath;
  }

  const processedCollection = processCollection(collection);
  collections = [...collections, processedCollection];
  outputCollection(processedCollection);

  if (options.watch) {
    const w = watch(path, { ignoreInitial: true });
    const handler = createReprocessHandler(collection.name);
    if (handler) w.on("all", handler);
    watchers[collection.name] = w;
  }

  return collection.name;
}

export function deregisterCollection(name: string) {
  const watch = watchers[name];
  watch.close();
  delete watchers[name];
  collections = collections.filter((c) => c.name !== name);
}

export function getCollections() {
  return collections;
}

export function getCollection(name: string) {
  return collections.find((c) => c.name === name);
}

function createReprocessHandler(name: string) {
  const collection = collections.find((c) => c.name === name);
  if (!collection) return;

  return async () => {
    const files = await glob(collection.searchPath);
    const newCollection: Collection = {
      ...collection,
      contents: files
        .map((file) => {
          const type = determineFileType(file);
          return { file, type, url: file };
        })
        .filter((content) => {
          if (content.type === "unknown") console.warn(`Ignoring file because of unknown file type: ${content.file}`);
          return content.type !== "unknown";
        }),
    };

    const processedCollection = processCollection(newCollection);
    collections = collections.map((c) => (c.name === name ? processedCollection : c));
    outputCollection(processedCollection);
  };
}

function processCollection(collection: Collection) {
  const applyContentPipeline = getContentPipeline();
  const applyCollectionPipeline = getCollectionPipeline();

  let c: Collection = { ...collection, contents: collection.contents.map((content) => applyContentPipeline(content, collection, config)) };
  c = applyCollectionPipeline(c, config);

  return c;
}

async function outputCollection(collection: Collection) {
  if (collection.outputPath) {
    await fs.mkdir(collection.outputPath, { recursive: true });
    const filePath = join(collection.outputPath, `${collection.name}.json`);
    await fs.writeFile(filePath, JSON.stringify(collection.contents));
  }
}
