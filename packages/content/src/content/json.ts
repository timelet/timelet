import { Content, ContentStage } from "../types";

export const jsonContentStage: ContentStage<Content> = (content) => {
  if (content.type === "json") {
    console.log("JSON stage not implemented");
  }
  return content;
};
