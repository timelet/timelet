import { describe, it, expect } from "vitest";
import { replaceSegments, stripContentPath } from "./path";

describe("stripContentPath", () => {
  it("should strip the content path from a path", () => {
    const path = stripContentPath("/content/en-US/docs/getting-started/index.mdx", { key: "en-US", slug: "en", name: "English" });
    expect(path).toBe("/content/en-US/docs/getting-started/");
  });
});

describe("replaceSegments", () => {
  it("should replace segments", () => {
    const path = replaceSegments("/docs/", { docs: "doku" });
    expect(path).toBe("/doku/");
  });
  it("should replace nested segments", () => {
    const path = replaceSegments("/en/docs/getting-started/", { docs: "doku" });
    expect(path).toBe("/en/doku/getting-started/");
  });
  it("should replace multiple segments", () => {
    const path = replaceSegments("/en/docs/getting-started/", { docs: "doku", "getting-started": "erste-schritte" });
    expect(path).toBe("/en/doku/erste-schritte/");
  });
  it("should replace combined segments", () => {
    const path = replaceSegments("/en/docs/getting-started/", { "docs/getting-started": "doku/erste-schritte" });
    expect(path).toBe("/en/doku/erste-schritte/");
  });
  it("should replace combined segments with hash", () => {
    const path = replaceSegments("/en/docs/getting-started#second", { "docs/getting-started#second": "doku/erste-schritte#zweitens" });
    expect(path).toBe("/en/doku/erste-schritte#zweitens");
  });
});
