import { ReactElement } from "react";

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
    interface PageContext {
      Page: Page;
      pageProps?: PageProps;
      headProps?: HeadProps;
      urlPathname: string;
      locale?: string;
      kind?: string;
    }
  }
}

// eslint-disable-next-line prettier/prettier
export { };
