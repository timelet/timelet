import { describe, expect, it } from "vitest";
import { validateConfiguration } from "./configuration";

describe("validateConfiguration", () => {
  it("should throw if locales not defined", async () => {
    expect(() => validateConfiguration({ defaultLocale: "en-US" })).toThrow();
  });
  it("should throw if default locale not defined", async () => {
    expect(() => validateConfiguration({ locales: [{ key: "en-US", slug: "en" }] })).toThrow();
  });
  it("should throw if default locale not in locales", async () => {
    expect(() => validateConfiguration({ locales: [{ key: "en-US", slug: "en" }], defaultLocale: "de-CH" })).toThrow();
  });
});
