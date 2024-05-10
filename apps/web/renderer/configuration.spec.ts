import { describe, expect, it } from "vitest";
import { CONFIGURATION } from "./configuration";

describe("configuration", () => {
  it("should have a valid default locale", () => {
    const localeKeys = CONFIGURATION.LOCALES.map((locale) => locale.key);
    expect(localeKeys).toContain(CONFIGURATION.DEFAULT_LOCALE);
  });
  it("should have unique locale keys", () => {
    const localeKeys = CONFIGURATION.LOCALES.map((locale) => locale.key);
    const uniqueKeys = new Set(localeKeys);
    expect(localeKeys.length).toBe(uniqueKeys.size);
  });
  it("should have unique locale slugs", () => {
    const localeSlugs = CONFIGURATION.LOCALES.map((locale) => locale.slug);
    const uniqueSlugs = new Set(localeSlugs);
    expect(localeSlugs.length).toBe(uniqueSlugs.size);
  });
  it("should not have conflicting routes", () => {
    const routes: string[] = CONFIGURATION.LOCALES.flatMap((locale) => Object.values(locale.routes || {}));
    const uniqueRoutes = new Set(routes);
    expect(routes.length).toBe(uniqueRoutes.size);
  });
});
