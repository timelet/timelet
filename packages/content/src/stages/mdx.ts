import { Content, Stage } from "../types";

export const mdxStage: Stage<Content> = (content) => {
  if (content.type === "mdx") {
    console.log(content);
  }
  return content;
};
