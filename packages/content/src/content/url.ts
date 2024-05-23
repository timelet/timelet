import { Content, ContentStage } from "../types";
import { stripPath } from "../utils/path";

export const urlContentStage: ContentStage = (content, collection) => {
  const url = stripPath(content.file, collection.basePath);
  let c: Content = { ...content, url };
  const slug = url.split("/").pop();
  if (slug) c = { ...c, meta: { ...c.meta, slug } };

  return c;
};
