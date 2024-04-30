import { OnBeforeRouteSync } from "vike/types";
import { findClosestLocale, splitLocaleFromURL } from "./utils/locale";
import { CONFIGURATION } from "./configuration";

export const onBeforeRoute: OnBeforeRouteSync = (pageContext) => {
  const { locale, path } = splitLocaleFromURL(pageContext.urlParsed.pathname, CONFIGURATION.DEFAULT_LOCALE);
  const closestLocale = findClosestLocale(locale, Object.keys(CONFIGURATION.LOCALES)) || CONFIGURATION.DEFAULT_LOCALE;
  const internalLocale = CONFIGURATION.LOCALES[closestLocale as keyof typeof CONFIGURATION.LOCALES];
  const urlLogical = pageContext.urlOriginal.replace(pageContext.urlParsed.pathname, path);
  const availableLocales = Object.entries(CONFIGURATION.LOCALES).map(([_key, value]) => ({
    locale: value,
    path: pageContext.urlOriginal.replace(pageContext.urlParsed.pathname, `/${value.slug}${path}`),
  }));

  return { pageContext: { locale: internalLocale, availableLocales, urlLogical } };
};
