import { beforeAll, describe, expect, it, vi } from "vitest";
import { onBeforePrerenderStart } from "./+onBeforePrerenderStart";

describe("onBeforePrerenderStart", () => {
  beforeAll(() => {
    vi.mock("glob", async (importOriginal) => {
      const glob = await importOriginal<typeof import("glob")>();
      return {
        ...glob,
        glob: async (_pattern: string) => {
          return [
            "../../assets/content/en-US/docs/getting-started.mdx",
            "../../assets/content/en-US/docs/index.mdx",
            "../../assets/content/de-CH/docs/getting-started.mdx",
            "../../assets/content/de-CH/docs/index.mdx",
          ];
        },
      };
    });
  });

  it("should return an array of paths", async () => {
    const paths = await onBeforePrerenderStart();
    expect(paths).toEqual(["/docs/getting-started", "/docs/", "/de/doku/getting-started", "/de/doku/"]);
  });
});
