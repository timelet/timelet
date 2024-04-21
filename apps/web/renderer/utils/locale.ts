const FILENAME_SUFFIX_PATTERN = /^([^.]+)\.?(.*)?(?=\.\w+)/;
const IETF_BCP_47_LOCALE_PATTERN = /^\/?(\w{2}(-\w{2,})*)\/?/;

export function findClosestLocale(locale: string, locales: string[]) {
  if (locale.length === 5) {
    return locales.find((l) => l === locale);
  }
  return locales.find((l) => l.indexOf(locale) !== -1);
}

export const parseLocaleFromFilenameSuffix = (name: string, defaultLocale: string) => {
  const nameMatch = name.match(FILENAME_SUFFIX_PATTERN);
  const filename = nameMatch && nameMatch[1] ? nameMatch[1] : name;
  const estimatedLocale = nameMatch && nameMatch[2] ? nameMatch[2] : defaultLocale;

  return { filename, estimatedLocale };
};

export const parseLocaleFromURL = (url: string, defaultLocale: string) => {
  const localeMatch = url.match(IETF_BCP_47_LOCALE_PATTERN);
  return localeMatch ? localeMatch[1] : defaultLocale;
};
