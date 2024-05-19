import { describe, it, expect } from "vitest";
import { generateAvailablePaths, replaceSegments, stripContentPath, translatePath } from "./path";

describe("stripContentPath", () => {
  it("should strip the content path from a path", () => {
    const path = stripContentPath("../../assets/content/en-US/docs/getting-started/index.mdx");
    expect(path).toBe("/en-US/docs/getting-started/");
  });
  it("should strip the content path from a path with locale", () => {
    const path = stripContentPath("../../assets/content/en-US/docs/getting-started/index.mdx", { key: "en-US", slug: "en", name: "English" });
    expect(path).toBe("/docs/getting-started/");
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

describe("generateAvailablePaths", () => {
  it("should generate available paths", () => {
    const paths = generateAvailablePaths("/docs/getting-started/", [
      { key: "en-US", slug: "en", name: "English" },
      { key: "de-CH", slug: "de", name: "Deutsch", routes: { docs: "doku" } },
    ]);
    expect(paths).toEqual([
      { locale: { key: "en-US", slug: "en", name: "English" }, path: "/docs/getting-started/" },
      { locale: { key: "de-CH", slug: "de", name: "Deutsch", routes: { docs: "doku" } }, path: "/de/doku/getting-started/" },
    ]);
  });
});

describe("translatePath", () => {
  it("should translate a path", () => {
    const { translatedPath, locale, path } = translatePath(
      "/en-US/docs/getting-started/",
      [
        { key: "en-US", slug: "en", name: "English" },
        { key: "de-CH", slug: "de", name: "Deutsch", routes: { docs: "doku" } },
      ],
      "en-US"
    );
    expect(translatedPath).toBe("/docs/getting-started/");
    expect(locale).toEqual({ key: "en-US", slug: "en", name: "English" });
    expect(path).toBe("/docs/getting-started/");
  });
  it("should translate a path to a non default locale", () => {
    const { translatedPath, locale, path } = translatePath(
      "/de-CH/docs/getting-started/",
      [
        { key: "en-US", slug: "en", name: "English" },
        { key: "de-CH", slug: "de", name: "Deutsch", routes: { docs: "doku" } },
      ],
      "en-US"
    );
    expect(translatedPath).toBe("/de/doku/getting-started/");
    expect(locale).toEqual({ key: "de-CH", slug: "de", name: "Deutsch", routes: { docs: "doku" } });
    expect(path).toBe("/docs/getting-started/");
  });
});
