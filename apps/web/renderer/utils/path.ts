import { Url } from "vike/types";
import { CONFIGURATION } from "../configuration";
import { Locale } from "../../types";

export function stripContentPath(path: string, locale?: Locale) {
  const contentPath = locale ? `${CONFIGURATION.PATHS.CONTENT}/${locale.key}/` : `${CONFIGURATION.PATHS.CONTENT}/`;
  return path.replace(contentPath, "").replace(".mdx", "").replace("index", "");
}

export function createLocalePath(path: string, locale?: Locale) {
  if (path.startsWith("http")) {
    return path;
  }

  if (!locale || locale.key === CONFIGURATION.DEFAULT_LOCALE) {
    return path;
  }

  return `/${locale.slug}${path}`;
}

export function urlToString({ origin, pathname, searchOriginal }: Url) {
  return `${origin || ""}${pathname}${searchOriginal || ""}`;
}

export const replaceSegments = (path: string, segments: Record<string, string>) => {
  const keys = Object.keys(segments);
  if (keys.length > 0) {
    const exp = new RegExp(keys.join("|"), "g");
    return path.replace(exp, (match) => segments[match]);
  }
  return path;
};
