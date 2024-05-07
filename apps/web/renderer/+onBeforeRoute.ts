import { OnBeforeRouteSync } from "vike/types";
import { findClosestLocale, splitLocaleFromURL } from "./utils/locale";
import { CONFIGURATION } from "./configuration";
import { createLocalePath, urlToString } from "./utils/path";

export const onBeforeRoute: OnBeforeRouteSync = (pageContext) => {
  const { localeSlug, path } = splitLocaleFromURL(pageContext.urlParsed.pathname, CONFIGURATION.DEFAULT_LOCALE);
  const closestLocale =
    findClosestLocale(
      localeSlug,
      CONFIGURATION.LOCALES.map((locale) => locale.key)
    ) || CONFIGURATION.DEFAULT_LOCALE;
  const urlOriginal = urlToString(pageContext.urlParsed);
  const locale = CONFIGURATION.LOCALES.find((l) => l.key === closestLocale);
  const urlLogical = urlOriginal.replace(pageContext.urlParsed.pathname, path);
  const availableLocales = CONFIGURATION.LOCALES.map((l) => ({
    locale: l,
    path: urlOriginal.replace(pageContext.urlParsed.pathname, createLocalePath(path, l)),
  }));

  return { pageContext: { locale, availableLocales, urlLogical } };
};
