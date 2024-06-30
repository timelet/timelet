import { describe, expect, it, vi } from "vitest";
import { getCollection, registerCollection } from "./collections";
import { setConfiguration } from "./configuration";
import { Collection, Content } from "./types";

const mocks = vi.hoisted(() => {
  const mockFiles = [
    "assets/content/de-CH/docs/getting-started.mdx",
    "assets/content/de-CH/docs/index.mdx",
    "assets/content/en-US/docs/getting-started.mdx",
    "assets/content/en-US/docs/index.mdx",
  ];

  return {
    glob: vi.fn().mockReturnValue(mockFiles),
    getCollectionPipeline: vi.fn().mockReturnValue((content: Content) => content),
    getContentPipeline: vi.fn().mockReturnValue((collection: Collection) => collection),
  };
});

vi.mock("fast-glob", () => ({
  default: mocks.glob,
}));

vi.mock("./pipeline", () => ({
  getCollectionPipeline: mocks.getCollectionPipeline,
  getContentPipeline: mocks.getContentPipeline,
}));

describe("registerCollection", () => {
  it("should register collection with i18n", async () => {
    setConfiguration({
      i18n: {
        locales: [
          { key: "en-US", slug: "en" },
          { key: "de-CH", slug: "de" },
        ],
        defaultLocale: "en-US",
      },
    });
    const name = await registerCollection({
      name: "test",
      basePath: "assets/content/",
      globPath: "/**/docs/**/*.mdx",
    });
    expect(mocks.glob).toHaveBeenCalledWith("assets/content/**/docs/**/*.mdx");
    expect(name).toBeDefined();
    const collection = getCollection(name);
    expect(collection).toMatchInlineSnapshot(`
      {
        "basePath": "assets/content/",
        "contents": [
          {
            "file": "assets/content/de-CH/docs/getting-started.mdx",
            "type": "mdx",
            "url": "assets/content/de-CH/docs/getting-started.mdx",
          },
          {
            "file": "assets/content/de-CH/docs/index.mdx",
            "type": "mdx",
            "url": "assets/content/de-CH/docs/index.mdx",
          },
          {
            "file": "assets/content/en-US/docs/getting-started.mdx",
            "type": "mdx",
            "url": "assets/content/en-US/docs/getting-started.mdx",
          },
          {
            "file": "assets/content/en-US/docs/index.mdx",
            "type": "mdx",
            "url": "assets/content/en-US/docs/index.mdx",
          },
        ],
        "name": "test",
        "searchPath": "assets/content/**/docs/**/*.mdx",
      }
    `);
  });
  it("should render collection", async () => {
    setConfiguration({
      i18n: {
        locales: [
          { key: "en-US", slug: "en" },
          { key: "de-CH", slug: "de" },
        ],
        defaultLocale: "en-US",
      },
    });
    const name = await registerCollection({
      name: "test",
      basePath: "assets/content/",
      globPath: "/**/docs/**/*.mdx",
      options: { render: true },
    });
    expect(mocks.glob).toHaveBeenCalledWith("assets/content/**/docs/**/*.mdx");
    expect(name).toBeDefined();
    const collection = getCollection(name);
    expect(collection).toMatchInlineSnapshot(`
      {
        "basePath": "assets/content/",
        "contents": [
          {
            "file": "assets/content/de-CH/docs/getting-started.mdx",
            "type": "mdx",
            "url": "assets/content/de-CH/docs/getting-started.mdx",
          },
          {
            "file": "assets/content/de-CH/docs/index.mdx",
            "type": "mdx",
            "url": "assets/content/de-CH/docs/index.mdx",
          },
          {
            "file": "assets/content/en-US/docs/getting-started.mdx",
            "type": "mdx",
            "url": "assets/content/en-US/docs/getting-started.mdx",
          },
          {
            "file": "assets/content/en-US/docs/index.mdx",
            "type": "mdx",
            "url": "assets/content/en-US/docs/index.mdx",
          },
        ],
        "name": "test",
        "outputPath": "./.timelet/content/",
        "searchPath": "assets/content/**/docs/**/*.mdx",
      }
    `);
  });
});
