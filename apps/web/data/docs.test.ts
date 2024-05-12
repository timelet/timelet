import { describe, it } from "vitest";
import { getDocsIndex } from "./docs";

describe("getDocsIndex", () => {
  it("should return an array of docs", async () => {
    console.log(await getDocsIndex("assets/content/", "*/docs/**/*.mdx"));
  });
});
