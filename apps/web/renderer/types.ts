export type { PageContextServer };
export type { PageContextClient };
export type { PageContext };
export type { PageProps };

import type { PageContextBuiltIn, PageContextBuiltInClientWithClientRouting as PageContextBuiltInClient } from "vike/types";
//import type { PageContextBuiltInClient } from "vike/client"; // When using Server Routing

type Page = (pageProps: PageProps) => React.ReactElement;
type PageProps = object;

export type PageContextCustom = {
  Page: Page;
  pageProps?: PageProps;
  urlPathname: string;
  locale: string;
  exports: {
    documentProps?: {
      slug?: string;
      title?: string;
      description?: string;
    };
  };
};

type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom;
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom;

type PageContext = PageContextClient | PageContextServer;
