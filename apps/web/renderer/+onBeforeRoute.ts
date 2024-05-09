import { OnBeforeRouteSync } from "vike/types";
import { findClosestLocale, splitLocaleFromURL } from "./utils/locale";
import { CONFIGURATION } from "./configuration";
import { generateAvailablePaths, replaceSegments, urlToString } from "./utils/path";

export const onBeforeRoute: OnBeforeRouteSync = (pageContext): ReturnType<OnBeforeRouteSync> => {
  const { localeSlug, path } = splitLocaleFromURL(pageContext.urlParsed.pathname, CONFIGURATION.DEFAULT_LOCALE);
  const closestLocale =
    findClosestLocale(
      localeSlug,
      CONFIGURATION.LOCALES.map((locale) => locale.key)
    ) || CONFIGURATION.DEFAULT_LOCALE;
  const locale = CONFIGURATION.LOCALES.find((l) => l.key === closestLocale);
  const urlOriginal = urlToString(pageContext.urlParsed);
  let urlLogical = urlOriginal.replace(pageContext.urlParsed.pathname, path);
  urlLogical = replaceSegments(urlLogical, locale?.routes);

  const availableLocales = generateAvailablePaths(path, CONFIGURATION.LOCALES);

  return { pageContext: { locale, availableLocales, urlLogical } };
};
