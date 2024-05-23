import { CollectionRegistration, Collection } from "./types";
import glob from "fast-glob";
import { determineFileType } from "./utils/path";
import { randomUUID } from "node:crypto";
import { mdxContentStage } from "./content/mdx";
import { jsonContentStage } from "./content/json";
import { createCollectionPipeline, createContentPipeline } from "./pipeline";
import { getConfiguration } from "./configuration";
import { urlContentStage } from "./content/url";
import { join } from "node:path";
import { i18nContentStage } from "./content/i18n";
import { translationCollectionStage } from "./collection/translation";

let collections: Collection[] = [];

export async function registerCollection(registration: CollectionRegistration) {
  const path = join(registration.basePath, registration.globPath);
  const type = determineFileType(path);
  if (type === "unknown") throw new Error("Unsupported file type");

  const files = await glob(path);
  if (files.length === 0) throw new Error("No files found");

  const name = registration.name || randomUUID();
  const collection: Collection = { name, basePath: registration.basePath, contents: files.map((file) => ({ file, type, url: file })) };

  collections = [...collections, processCollection(collection)];

  return name;
}

export function deregisterCollection(name: string) {
  collections = collections.filter((c) => c.name !== name);
}

export function getCollections() {
  return collections;
}

export function getCollection(name: string) {
  return collections.find((c) => c.name === name);
}

function processCollection(collection: Collection) {
  const config = getConfiguration();
  const contentStages = [urlContentStage, jsonContentStage, mdxContentStage, i18nContentStage];
  const applyContentPipeline = createContentPipeline(contentStages);
  const collectionStages = [translationCollectionStage];
  const applyCollectionPipeline = createCollectionPipeline(collectionStages);

  let c: Collection = { ...collection, contents: collection.contents.map((f) => applyContentPipeline(f, collection, config)) };
  c = applyCollectionPipeline(c, config);

  return c;
}
