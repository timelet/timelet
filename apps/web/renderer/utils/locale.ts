const IETF_BCP_47_LOCALE_PATTERN = /^\/?(\w{2}(?!\w)(-\w{2,})*)\/?/;
const SINGLE_LEADING_SLASH_PATTERN = /^\/(?=\/)/;
const REMOVE_LEADING_SLASH_PATTERN = /^\/+/;

export function findClosestLocale(locale: string, locales: string[]) {
  if (locale.length === 5) {
    return locales.find((l) => l === locale);
  }
  return locales.find((l) => l.indexOf(locale) !== -1);
}

export function parseLocaleFromURL(url: string, defaultLocale: string) {
  const localeMatch = url.match(IETF_BCP_47_LOCALE_PATTERN);
  return localeMatch ? localeMatch[1] : defaultLocale;
}

export function splitLocaleFromURL(url: string, defaultLocale: string) {
  const locale = parseLocaleFromURL(url, defaultLocale);
  const path = url.replace(locale, "").replace(url.startsWith("/") ? SINGLE_LEADING_SLASH_PATTERN : REMOVE_LEADING_SLASH_PATTERN, "");
  return { locale, path };
}
