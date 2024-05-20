import { CollectionRegistration, Collection, Contents, Content } from "./types";
import glob from "fast-glob";
import { determineFileType } from "./utils/path";
import { randomUUID } from "node:crypto";
import { mdxStage } from "./stages/mdx";
import { jsonStage } from "./stages/json";
import { createPipeline } from "./pipeline";

const collections: Collection[] = [];
let contents: Contents[] = [];
const stages = [jsonStage, mdxStage];
const pipeline = createPipeline<Content>(stages);

export async function registerCollection(registration: CollectionRegistration) {
  const type = determineFileType(registration.path);
  if (type === "unknown") throw new Error("Unsupported file type");

  const files = await glob(registration.path);
  if (files.length === 0) throw new Error("No files found");

  const name = registration.name || randomUUID();

  collections.push({ name, files: files.map((file) => ({ file, type })) });
  processCollections();
}

export function deregisterCollection(name: string) {
  const index = collections.findIndex((c) => c.name === name);
  if (index === -1) throw new Error("Collection not found");

  collections.splice(index, 1);
}

export async function processCollections() {
  contents = collections.map((c) => {
    return {
      name: c.name,
      contents: c.files.map((f) => pipeline({ ...f, url: f.file, meta: {} })),
    };
  });
}
