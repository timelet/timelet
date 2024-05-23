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

  collections = [...collections, { name, basePath: registration.basePath, contents: files.map((file) => ({ file, type, url: file })) }];
  processCollections();

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

async function processCollections() {
  const config = getConfiguration();
  const contentStages = [urlContentStage, jsonContentStage, mdxContentStage, i18nContentStage];
  const applyContentPipeline = createContentPipeline(contentStages);

  collections = collections.map((c) => {
    return {
      name: c.name,
      basePath: c.basePath,
      contents: c.contents.map((f) => applyContentPipeline(f, c, config)),
    };
  });

  const collectionStages = [translationCollectionStage];
  const applyCollectionPipeline = createCollectionPipeline(collectionStages);
  collections = collections.map((c) => applyCollectionPipeline(c, config));
}
