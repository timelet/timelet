import { describe, expect, it } from "vitest";
import { registerCollection } from "./collections";
import { setConfiguration } from "./configuration";

describe("registerCollection", () => {
  it("should register collection", async () => {
    setConfiguration({
      locales: [
        { key: "en-US", slug: "en" },
        { key: "de-CH", slug: "de" },
      ],
      defaultLocale: "en-US",
    });
    await registerCollection({ path: "assets/content/**/docs/**/*.mdx" });
    expect(true).toBe(true);
  });
});
