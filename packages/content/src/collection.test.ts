import { describe, expect, it } from "vitest";
import { getCollection, registerCollection } from "./collections";
import { setConfiguration } from "./configuration";

describe("registerCollection", () => {
  it("should register collection", async () => {
    setConfiguration({
      i18n: {
        locales: [
          { key: "en-US", slug: "en" },
          { key: "de-CH", slug: "de" },
        ],
        defaultLocale: "en-US",
      },
    });
    const name = await registerCollection({ basePath: "assets/content/", globPath: "/**/docs/**/*.mdx" });
    expect(name).toBeDefined();
    console.log(getCollection(name));
    expect(true).toBe(true);
  });
});
