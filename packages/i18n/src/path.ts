import nodePath from "node:path";
import { PathSegments } from "./types";

const FILE_INDEX_PATTERN = /index/i;
const IETF_BCP_47_LOCALE_PATTERN = /^\/?(\w{2}(?!\w)(-\w{1,})*)\/?/;
const SINGLE_LEADING_SLASH_PATTERN = /^\/(?=\/)/;
const REMOVE_LEADING_SLASH_PATTERN = /^\/+/;

export function stripPath(path: string, basePath?: string) {
  if (basePath && !basePath.endsWith("/")) throw new Error("Base path must end with a slash and point to a directory");

  const p = nodePath.parse(path);
  const d = basePath ? nodePath.join(p.dir.replace(basePath, "/")) : p.dir;

  return nodePath.join(d, FILE_INDEX_PATTERN.test(p.name) ? nodePath.sep : p.name);
}

export function replaceSegments(path: string, segments?: PathSegments) {
  if (!segments) return path;

  const keys = Object.keys(segments);
  if (keys.length > 0) {
    const exp = new RegExp(keys.join("|"), "g");
    return path.replace(exp, (match) => segments[match]);
  }

  return path;
}

export function parseLocaleTagFromPath(path: string) {
  const match = path.match(IETF_BCP_47_LOCALE_PATTERN);
  return match ? match[1] : undefined;
}

export function splitLocaleFromPath(path: string) {
  const locale = parseLocaleTagFromPath(path);
  if (!locale) return undefined;

  const p = path.replace(locale, "").replace(path.startsWith("/") ? SINGLE_LEADING_SLASH_PATTERN : REMOVE_LEADING_SLASH_PATTERN, "");
  return { locale, path: p };
}

export function prependSlugToPath(path: string, slug: string) {
  if (path.startsWith("http")) throw new Error("Cannot prepend slug to URL");

  const p = nodePath.parse(path);
  return nodePath.join(path.startsWith("/") ? nodePath.sep : "", slug, p.dir, p.base, path.endsWith("/") ? nodePath.sep : "");
}
