import { Content, Stage } from "../types";
import { stripPath } from "../utils/path";

export const urlStage: Stage<Content> = (content, collection) => {
  const url = stripPath(content.file, collection.basePath);
  return { ...content, url };
};
