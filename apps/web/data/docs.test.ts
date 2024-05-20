import { describe, it } from "vitest";
import { getDocsIndex } from "./docs";

describe("getDocsIndex", () => {
  it("should return an array of docs", async () => {
    await getDocsIndex("assets/content/", "*/docs/**/*.mdx");
  });
});
