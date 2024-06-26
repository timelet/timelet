import { describe, it, expect } from "vitest";
import { determineFileType } from "./path";

describe("determineType", () => {
  it("should determine the type of a file", () => {
    const type = determineFileType("../../assets/content/en-US/docs/getting-started/test.mdx");
    expect(type).toBe("mdx");
  });
  it("should determine the type of an unknown file", () => {
    const type = determineFileType("../../assets/content/en-US/docs/getting-started/test.unknown");
    expect(type).toBe("unknown");
  });
});
