import { CollectionRegistration, Collection } from "./types";
import glob from "fast-glob";
import { determineFileType } from "./utils/path";
import { randomUUID } from "node:crypto";
import { getCollectionPipeline, getContentPipeline } from "./pipeline";
import { getConfiguration } from "./configuration";
import { join } from "node:path";

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
  const applyContentPipeline = getContentPipeline();
  const applyCollectionPipeline = getCollectionPipeline();

  let c: Collection = { ...collection, contents: collection.contents.map((content) => applyContentPipeline(content, collection, config)) };
  c = applyCollectionPipeline(c, config);

  return c;
}
