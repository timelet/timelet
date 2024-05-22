import { CollectionRegistration, Collection, Content } from "./types";
import glob from "fast-glob";
import { determineFileType } from "./utils/path";
import { randomUUID } from "node:crypto";
import { mdxStage } from "./stages/mdx";
import { jsonStage } from "./stages/json";
import { createPipeline } from "./pipeline";
import { getConfiguration } from "./configuration";
import { urlStage } from "./stages/url";
import { join } from "node:path";
import { i18nStage } from "./stages/i18n";

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
  const stages = [urlStage, jsonStage, mdxStage, i18nStage];
  const pipeline = createPipeline<Content>(stages);

  collections = collections.map((c) => {
    return {
      name: c.name,
      basePath: c.basePath,
      contents: c.contents.map((f) => pipeline(f, c, config)),
    };
  });
}
