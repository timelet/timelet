import { describe, expect, it } from "vitest";
import { translatePath } from "./i18n";

describe("translatePath", () => {
  it("should translate a path", () => {
    const { path, locale, pathWithoutLocale } = translatePath(
      "/en-US/docs/getting-started/",
      [
        { key: "en-US", slug: "en" },
        { key: "de-CH", slug: "de", segments: { docs: "doku" } },
      ],
      "en-US"
    );
    expect(path).toBe("/docs/getting-started/");
    expect(locale).toEqual("en-US");
    expect(pathWithoutLocale).toBe("/docs/getting-started/");
  });
  it("should translate a path with segments", () => {
    const { path, locale, pathWithoutLocale } = translatePath(
      "/de/docs/getting-started/",
      [
        { key: "en-US", slug: "en" },
        { key: "de-CH", slug: "de", segments: { docs: "doku" } },
      ],
      "en-US"
    );
    expect(path).toBe("/de/doku/getting-started/");
    expect(locale).toEqual("de-CH");
    expect(pathWithoutLocale).toBe("/docs/getting-started/");
  });
});
