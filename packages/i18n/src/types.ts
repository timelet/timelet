// Files and paths
export type PathSegments = Record<string, string>;

// I18n
export type Locale = string;
export type LocaleDetails<L = Locale> = {
  key: L;
  slug: string;
  segments?: PathSegments;
};
export type LocalizedContent = {
  l10n?: {
    locale: Locale;
    pathWithoutLocale: string;
    translations?: Array<{ locale: Locale; url: string }>;
  };
};
