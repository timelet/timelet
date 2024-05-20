import { TObject } from "@sinclair/typebox";

// Constants

export const UNKNOWN_FILE_TYPE = "unknown";
export const FILE_TYPES = ["mdx", "md", "json", "yaml", "yml", UNKNOWN_FILE_TYPE] as const;

// Pipeline

export type Stage<T> = (content: T) => T;

// Configuration

export type Configuration = {
  locales?: LocaleDetails[];
  defaultLocale?: Locale;
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
  path: string;
  type?: TObject;
};
export type Collection = {
  name: string;
  files: Array<File>;
};
export type Contents = {
  name: string;
  contents: Array<Content>;
};

// Content types

/**
 * A content object
 */
export type Content<M = Record<string, string>> = File & {
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

// I18n

export type Locale = string;
export type LocaleDetails<L = Locale> = {
  key: L;
  slug: string;
  segments?: PathSegments;
};
export type LocalizedContent = Content & {
  localized: true;
  locale: Locale;
  fileWithoutLocale: string;
  translations: Array<{ locale: Locale; url: string }>;
};
