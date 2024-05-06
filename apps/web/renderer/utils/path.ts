import { Url } from "vike/types";
import { CONFIGURATION } from "../configuration";

export function stripContentPath(path: string, locale?: keyof typeof CONFIGURATION.LOCALES) {
  const contentPath = locale ? `${CONFIGURATION.PATHS.CONTENT}/${locale}/` : `${CONFIGURATION.PATHS.CONTENT}/`;
  return path.replace(contentPath, "").replace(".mdx", "").replace("index", "");
}

export function urlToString({ origin, pathname, searchOriginal }: Url) {
  return `${origin || ""}${pathname}${searchOriginal || ""}`;
}
