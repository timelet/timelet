import { findClosestLocale, parseLocaleFromURL, splitLocaleFromURL } from "./locale";
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

describe("parseLocaleFromURL", () => {
  it("should parse the locale from a URL", () => {
    const locale = parseLocaleFromURL("/en-US/docs/getting-started", "en");
    expect(locale).toBe("en-US");
  });

  it("should parse the locale from a URL without leading slash", () => {
    const locale = parseLocaleFromURL("en-US/docs/getting-started", "en");
    expect(locale).toBe("en-US");
  });

  it("should parse the locale from a URL with trailing slash", () => {
    const locale = parseLocaleFromURL("/en-US/", "en");
    expect(locale).toBe("en-US");
  });

  it("should parse the locale from a URL without trailing slashes", () => {
    const locale = parseLocaleFromURL("/en-US", "en");
    expect(locale).toBe("en-US");
  });

  it("should parse the short form locale from a URL", () => {
    const locale = parseLocaleFromURL("/en", "de");
    expect(locale).toBe("en");
  });

  it("should return the default locale if no locale was found in URL", () => {
    const locale = parseLocaleFromURL("/", "en");
    expect(locale).toBe("en");
  });

  it("shouldn't work on non locales", () => {
    const locale = parseLocaleFromURL("/docs", "en");
    expect(locale).toBe("en");
  });
});

describe("splitLocaleFromURL", () => {
  it("should split the locale from a URL", () => {
    const { locale, path } = splitLocaleFromURL("/en-US/docs/getting-started", "de");
    expect(locale).toBe("en-US");
    expect(path).toBe("/docs/getting-started");
  });

  it("should split the locale from a URL without leading slash", () => {
    const { locale, path } = splitLocaleFromURL("en-US/docs/getting-started", "de");
    expect(locale).toBe("en-US");
    expect(path).toBe("docs/getting-started");
  });
});
