export const UNKNOWN_FILE_TYPE = "unknown";
export const FILE_TYPES = ["mdx", "md", "json", "yaml", "yml", UNKNOWN_FILE_TYPE] as const;

export type PathSegments = Record<string, string>;
export type FileType = (typeof FILE_TYPES)[number];
export type Locale = string;
export type LocaleDetails<L = Locale> = {
  key: L;
  slug: string;
  segments?: PathSegments;
};
export type FileContent<M = Record<string, string>> = {
  file: string;
  url: string;
  type: FileType;
  meta: M;
};
export type LocalizedFileContent<M = Record<string, string>> = FileContent<M> & {
  locale: Locale;
  fileWithoutLocale: string;
  translations: Array<{ locale: Locale; url: string }>;
};
export type MarkdownMeta = {
  title: string;
  slug: string;
};
