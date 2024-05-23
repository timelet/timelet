import { TObject } from "@sinclair/typebox";

// Constants

export const UNKNOWN_FILE_TYPE = "unknown";
export const FILE_TYPES = ["mdx", "md", "json", "yaml", "yml", UNKNOWN_FILE_TYPE] as const;

// Pipeline

export type ContentStage<T> = (content: T, collection: Collection, configuration?: Configuration) => T;

// Configuration

export type I18nConfiguration = {
  i18n?: {
    locales: LocaleDetails[];
    defaultLocale: Locale;
  };
};

export type Configuration = I18nConfiguration & {
  renderPath?: string;
};

// Files and paths

export type PathSegments = Record<string, string>;
export type FileType = (typeof FILE_TYPES)[number];
/**
 * A file object
 */
export type File = {
  /**
   * The path to the file on the filesystem
   */
  file: string;
  /**
   * The type of the file
   */
  type: FileType;
};

// Collection

export type CollectionRegistration = {
  name?: string;
  globPath: string;
  basePath: string;
  type?: TObject;
};
export type Collection = {
  name: string;
  basePath: string;
  contents: Array<Content>;
};

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

// Content types

/**
 * A content object
 */
export type Content<M = Record<string, string>> = File &
  LocalizedContent & {
    /**
     * The URL to the file
     */
    url: string;
    /**
     * The metadata of the file
     */
    meta?: M;
  };

export type MarkdownMeta = {
  title: string;
  slug: string;
};

export type MDContent<M = MarkdownMeta> = Content<M> & {
  type: "md";
};

export type MDXContent<M = MarkdownMeta> = Content<M> & {
  type: "mdx";
};
