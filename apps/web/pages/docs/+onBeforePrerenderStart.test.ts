import { beforeAll, describe, expect, it, vi } from "vitest";
import { onBeforePrerenderStart } from "./+onBeforePrerenderStart";

describe("onBeforePrerenderStart", () => {
  beforeAll(() => {
    vi.mock("glob", async (importOriginal) => {
      const glob = await importOriginal<typeof import("glob")>();
      return {
        ...glob,
        glob: async (_pattern: string) => {
          return ["../../assets/content/en-US/docs/getting-started/index.mdx", "../../assets/content/en-US/docs/index.mdx"];
        },
      };
    });
  });

  it("should return an array of paths", async () => {
    const paths = await onBeforePrerenderStart();
    expect(paths).toEqual(["/en-US/docs/getting-started/", "/en-US/docs/"]);
  });
});
