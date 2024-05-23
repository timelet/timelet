import { ContentStage } from "../types";

export const jsonContentStage: ContentStage = (content) => {
  if (content.type === "json") {
    console.log("JSON stage not implemented");
  }
  return content;
};
