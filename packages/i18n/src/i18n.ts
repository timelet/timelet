import { findClosestLocale } from "./locale";
import { prependSlugToPath, replaceSegments, splitLocaleFromPath } from "./path";
import { LocaleDetails } from "./types";

export function translatePath(path: string, locales: LocaleDetails[], defaultLocale: string) {
  const splitPath = splitLocaleFromPath(path);

  if (!splitPath) throw new Error(`No locale found in path ${path}.`);

  const locale = splitPath?.locale || defaultLocale;
  const closestLocale =
    findClosestLocale(
      locale,
      locales.map((locale) => locale.key)
    ) || defaultLocale;
  const localeDetails = locales.find((l) => l.key === closestLocale);

  if (!localeDetails) throw new Error(`No locale details for ${closestLocale} found.`);

  let translatedPath = splitPath?.path || path;
  if (defaultLocale !== closestLocale) translatedPath = prependSlugToPath(translatedPath, localeDetails.slug);
  translatedPath = replaceSegments(translatedPath, localeDetails.segments);

  return { path: translatedPath, locale: closestLocale, pathWithoutLocale: splitPath?.path };
}
