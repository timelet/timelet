import { Url } from "vike/types";
import { CONFIGURATION } from "../configuration";
import { Locale } from "../../types";
import { findClosestLocale, splitLocaleFromURL } from "./locale";
import { swap } from "./object";

export function stripContentPath(path: string, locale?: Locale) {
  const contentPath = locale ? `${CONFIGURATION.PATHS.CONTENT}/${locale.key}` : `${CONFIGURATION.PATHS.CONTENT}`;
  return path.replace(contentPath, "").replace(".mdx", "").replace("index", "");
}

export function createLocalePath(path: string, locale?: Locale) {
  if (path.startsWith("http")) return path;
  if (!locale || locale.key === CONFIGURATION.DEFAULT_LOCALE) return path;

  return `/${locale.slug}${path}`;
}

export function urlToString({ origin, pathname, searchOriginal }: Url) {
  return `${origin || ""}${pathname}${searchOriginal || ""}`;
}

export const replaceSegments = (path: string, segments?: Record<string, string>) => {
  if (!segments) return path;

  const keys = Object.keys(segments);
  if (keys.length > 0) {
    const exp = new RegExp(keys.join("|"), "g");
    return path.replace(exp, (match) => segments[match]);
  }

  return path;
};

export function generateAvailablePaths(path: string, locales: Locale[]) {
  return locales.map((l) => {
    let availablePath = createLocalePath(path, l);
    availablePath = replaceSegments(availablePath, l.routes);

    return {
      locale: l,
      path: availablePath,
    };
  });
}

export function translatePath(originalPath: string, locales: Locale[], defaultLocale: string) {
  const { locale: pathLocale, path } = splitLocaleFromURL(originalPath, defaultLocale);
  const closestLocale =
    findClosestLocale(
      pathLocale,
      locales.map((locale) => locale.key)
    ) || defaultLocale;
  const locale = locales.find((l) => l.key === closestLocale);

  let translatedPath = createLocalePath(path, locale);
  translatedPath = replaceSegments(translatedPath, locale?.routes);
  return { translatedPath, locale, path };
}

export function untranslatePath(originalPath: string, locales: Locale[], defaultLocale: string) {
  const { locale: pathLocale, path } = splitLocaleFromURL(originalPath, defaultLocale);
  const closestLocale =
    findClosestLocale(
      pathLocale,
      locales.map((locale) => locale.key)
    ) || defaultLocale;
  const locale = locales.find((l) => l.key === closestLocale);

  const untranslatedPath = replaceSegments(path, swap(locale?.routes));
  return { untranslatedPath, locale, path };
}
