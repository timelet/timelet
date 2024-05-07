const FILENAME_SUFFIX_PATTERN = /^([^.]+)\.?(.*)?(?=\.\w+)/;
const IETF_BCP_47_LOCALE_PATTERN = /^\/?(\w{2}(?!\w)(-\w{2,})*)\/?/;
const SINGLE_LEADING_SLASH_PATTERN = /^\/(?=\/)/;
const REMOVE_LEADING_SLASH_PATTERN = /^\/+/;

export function findClosestLocale(locale: string, locales: string[]) {
  if (locale.length === 5) {
    return locales.find((l) => l === locale);
  }
  return locales.find((l) => l.indexOf(locale) !== -1);
}

export function parseLocaleFromFilenameSuffix(name: string, defaultLocale: string) {
  const nameMatch = name.match(FILENAME_SUFFIX_PATTERN);
  const filename = nameMatch && nameMatch[1] ? nameMatch[1] : name;
  const estimatedLocale = nameMatch && nameMatch[2] ? nameMatch[2] : defaultLocale;

  return { filename, estimatedLocale };
}

export function parseLocaleFromURL(url: string, defaultLocale: string) {
  const localeMatch = url.match(IETF_BCP_47_LOCALE_PATTERN);
  return localeMatch ? localeMatch[1] : defaultLocale;
}

export function splitLocaleFromURL(url: string, defaultLocale: string) {
  const localeSlug = parseLocaleFromURL(url, defaultLocale);
  const path = url.replace(localeSlug, "").replace(url.startsWith("/") ? SINGLE_LEADING_SLASH_PATTERN : REMOVE_LEADING_SLASH_PATTERN, "");
  return { localeSlug, path };
}

export function generateLocalePath(slug: string, path: string) {
  return `/${slug}${path}`;
}
