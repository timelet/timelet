import { describe, it, expect } from "vitest";
import { parseLocaleTagFromPath, prependSlugToPath, replaceSegments, splitLocaleFromPath, stripPath } from "./path";

describe("stripPath", () => {
  it("should strip off file extensions", () => {
    const path = stripPath("../../assets/content/en-US/docs/getting-started/test.mdx");
    expect(path).toBe("../../assets/content/en-US/docs/getting-started/test");
  });
  it("should strip off index", () => {
    const path = stripPath("../../assets/content/en-US/index/getting-started/index.mdx");
    expect(path).toBe("../../assets/content/en-US/index/getting-started/");
  });
  it("should strip off index and basepath", () => {
    const path = stripPath("../../assets/content/en-US/index/getting-started/index.mdx", "../../assets/content/");
    expect(path).toBe("/en-US/index/getting-started/");
  });
  it("should check basepath pointing to a directory", () => {
    expect(() => stripPath("../../assets/content/en-US/index/getting-started/index.mdx", "../../assets/content")).toThrowError(
      "Base path must end with a slash and point to a directory"
    );
  });
});

describe("replaceSegments", () => {
  it("should return path if there are no segments", () => {
    const path = replaceSegments("/docs/");
    expect(path).toBe("/docs/");
  });
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

describe("parseLocaleTagFromPath", () => {
  it("should parse the locale from a URL", () => {
    const locale = parseLocaleTagFromPath("/en-US/docs/getting-started");
    expect(locale).toBe("en-US");
  });

  it("should parse the locale from a URL without leading slash", () => {
    const locale = parseLocaleTagFromPath("en-US/docs/getting-started");
    expect(locale).toBe("en-US");
  });

  it("should parse the locale from a URL with trailing slash", () => {
    const locale = parseLocaleTagFromPath("/en-US/");
    expect(locale).toBe("en-US");
  });

  it("should parse the locale from a URL without trailing slashes", () => {
    const locale = parseLocaleTagFromPath("/en-US");
    expect(locale).toBe("en-US");
  });

  it("should parse the short form locale from a URL", () => {
    const locale = parseLocaleTagFromPath("/en");
    expect(locale).toBe("en");
  });

  it("should return the default locale if no locale was found in URL", () => {
    const locale = parseLocaleTagFromPath("/");
    expect(locale).toBe(undefined);
  });

  it("shouldn't work on non locales", () => {
    const locale = parseLocaleTagFromPath("/docs");
    expect(locale).toBe(undefined);
  });
});

describe("splitLocaleFromPath", () => {
  it("should split the locale from path", () => {
    const splitPath = splitLocaleFromPath("/en-US/docs/getting-started");
    expect(splitPath?.locale).toBe("en-US");
    expect(splitPath?.path).toBe("/docs/getting-started");
  });

  it("should split the locale from path without leading slash", () => {
    const splitPath = splitLocaleFromPath("en-US/docs/getting-started");
    expect(splitPath?.locale).toBe("en-US");
    expect(splitPath?.path).toBe("docs/getting-started");
  });
});

describe("prependSlugToPath", () => {
  it("should prepend slug to path", () => {
    const path = prependSlugToPath("/docs/getting-started", "en");
    expect(path).toBe("/en/docs/getting-started");
  });
  it("should prepend slug to path and respect slash", () => {
    const path = prependSlugToPath("docs/getting-started", "en");
    expect(path).toBe("en/docs/getting-started");
  });
  it("should not prepend to urls", () => {
    expect(() => prependSlugToPath("https://example.com/docs/getting-started", "en")).toThrowError("Cannot prepend slug to URL");
  });
});
