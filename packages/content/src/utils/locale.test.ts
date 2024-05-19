import { describe, expect, it } from "vitest";
import { findClosestLocale } from "./locale";

describe("findClosestLocale", () => {
  it("should match exact locale", () => {
    const locale = findClosestLocale("zh-CN", ["de-CH", "en-US", "zh-CN"]);
    expect(locale).toBe("zh-CN");
  });
  it("should approximate locale", () => {
    const locale = findClosestLocale("zh", ["de-CH", "en-US", "zh-CN"]);
    expect(locale).toBe("zh-CN");
  });
});
