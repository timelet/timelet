import { ReactElement } from "react";

// Global types
export type Locale = {
  key: string;
  slug: string;
  name: string;
  routes?: Record<string, string>;
};
export type AvailableLocales = {
  locale: Locale;
  path: string;
}[];

// Utility types
export type Flatten<T> = T extends object ? T[keyof T] : T;
export type FlattenValues<T> = Flatten<{
  [K in keyof T]: T[K] extends object ? FlattenValues<T[K]> : T[K];
}>;

// Overrides
type Page = (pageProps: PageProps) => ReactElement;
type PageProps = object;
type HeadProps = {
  title?: string;
  description?: string;
};

declare global {
  namespace Vike {
    interface PageContext extends PageContext {
      Page: Page;
      pageProps?: PageProps;
      headProps?: HeadProps;
      urlPathname: string;
      locale?: Locale;
      availableLocales?: AvailableLocales;
      kind?: string;
      urlLogical: string;
    }
  }
}

// eslint-disable-next-line prettier/prettier
export { };
