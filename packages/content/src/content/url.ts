import { Content, ContentStage } from "../types";
import { stripPath } from "../utils/path";

export const urlContentStage: ContentStage<Content> = (content, collection) => {
  const url = stripPath(content.file, collection.basePath);
  return { ...content, url };
};
