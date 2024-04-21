import { describe, it, expect } from "vitest";
import { stripContentPath } from "./path";

describe("stripContentPath", () => {
  it("should strip the content path from a path", () => {
    const path = stripContentPath("/content/en-US/docs/getting-started/index.mdx", "en-US");
    expect(path).toBe("/content/en-US/docs/getting-started/");
  });
});
