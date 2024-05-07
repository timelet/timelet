import { it } from "node:test";
import { describe, expect } from "vitest";
import { CONFIGURATION } from "./configuration";

describe("configuration", () => {
  it("should have a valid default locale", () => {
    const localeKeys = CONFIGURATION.LOCALES.map((locale) => locale.key);
    expect(localeKeys).toContain(CONFIGURATION.DEFAULT_LOCALE);
  });
});
