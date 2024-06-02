import { TObject } from "@sinclair/typebox";

// Constants

export const UNKNOWN_FILE_TYPE = "unknown";
export const FILE_TYPES = ["mdx", "md", "json", "yaml", "yml", UNKNOWN_FILE_TYPE] as const;

// Pipelines

export type ContentStage = (content: Content, collection: Collection, configuration?: Configuration) => Content;
export type CollectionStage = (collection: Collection, configuration?: Configuration) => Collection;

// Configuration

export type I18nConfiguration = {
  i18n?: {
    locales: LocaleDetails[];
    defaultLocale: Locale;
  };
};

export type Configuration = I18nConfiguration & {
  outputPath?: string;
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

export const defaultCollectionOptions: CollectionRegistration["options"] = {
  watch: false,
  render: false,
};

export type CollectionRegistration = {
  name: string;
  globPath: string;
  basePath: string;
  options?: {
    type?: TObject;
    watch?: boolean;
    render?: boolean;
  };
};
export type Collection = {
  name: string;
  basePath: string;
  searchPath: string;
  outputPath?: string;
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
