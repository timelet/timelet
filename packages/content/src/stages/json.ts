import { Content, Stage } from "../types";

export const jsonStage: Stage<Content> = (content) => {
  if (content.type === "json") {
    console.log("JSON stage not implemented");
  }
  return content;
};
