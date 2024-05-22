import { describe, expect, it } from "vitest";
import { validateConfiguration } from "./configuration";

describe("validateConfiguration", () => {
  it("should throw if default locale not in locales", async () => {
    expect(() => validateConfiguration({ i18n: { locales: [{ key: "en-US", slug: "en" }], defaultLocale: "de-CH" } })).toThrow();
  });
});
