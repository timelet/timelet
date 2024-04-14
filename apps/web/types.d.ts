import { ReactElement } from "react";

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
