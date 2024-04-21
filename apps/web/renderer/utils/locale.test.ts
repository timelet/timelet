import { findClosestLocale, parseFilenameSuffix } from "./locale";
import { describe, it, expect } from "vitest";

describe("findClosestLocale", () => {
  it("should match exact locale", () => {
    const locale = findClosestLocale("zh-CN", ["de-CH", "en-US", "zh-CN"]);
    expect(locale).toBe("zh-CN");
  });

  it("should match languages to locale", () => {
    const locale = findClosestLocale("zh", ["de-CH", "en-US", "zh-CN"]);
    expect(locale).toBe("zh-CN");
  });
});

describe("parseFilenameSuffix", () => {
  it("should estimate the language in a filename", () => {
    const { estimatedLocale } = parseFilenameSuffix("index.de.md", "en");
    expect(estimatedLocale).toBe("de");
  });

  it("should estimate the exact locale in a filename", () => {
    const { estimatedLocale } = parseFilenameSuffix("index.de-CH.md", "en");
    expect(estimatedLocale).toBe("de-CH");
  });

  it("should return the default locale if no locale was found in filename", () => {
    const { estimatedLocale } = parseFilenameSuffix("index.md", "en");
    expect(estimatedLocale).toBe("en");
  });

  it("should return the filename without extensions, even when there is no locale", () => {
    const { filename } = parseFilenameSuffix("index.md", "en");
    expect(filename).toBe("index");
  });

  it("should return the filename without extensions", () => {
    const { filename } = parseFilenameSuffix("index.en-US.md", "en");
    expect(filename).toBe("index");
  });
});
