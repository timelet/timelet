import { Title } from "@timelet/ui";
import React from "react";
import { renderToString } from "react-dom/server";
import { MDXModule } from "mdx/types";
import { PageContext } from "../../../renderer/types";

const pages = import.meta.glob<MDXModule>("../../../../../assets/content/de-CH/**/*.mdx");

function createPageContext(page: MDXModule) {
  return {
    pageContext: {
      pageProps: {
        markdown: renderToString(page.default({ components: { Title: (props) => React.createElement(Title, props) } })),
      },
    },
  };
}

export async function prerender() {
  const renderPages = Object.keys(pages).map(async (p) => {
    const page = await pages[p]();
    const url = p.replace("../../../../../assets/content/de-CH", "").replace(".mdx", "").replace("index", "");
    return {
      url,
      ...createPageContext(page),
    };
  });

  return await Promise.all(renderPages);
}

export async function onBeforeRender(pageContext: PageContext) {
  const path = pageContext.urlPathname.match(/^\/docs\/?$/) ? "/docs/index" : pageContext.urlPathname;
  const match = pages[`../../../../../assets/content/de-CH${path}.mdx`];
  const page = await match();
  return createPageContext(page);
}
