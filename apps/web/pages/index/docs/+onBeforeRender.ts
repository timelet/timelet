import { compile } from "@mdx-js/mdx";
import { PageContext } from "../../../renderer/types";
import { mdxOptions } from "../../../mdx.config";

const pages = import.meta.glob<{ default: string }>("../../../../../assets/content/en-US/**/*.mdx", { query: "?raw" });

export async function onBeforeRender(pageContext: PageContext) {
  const path = pageContext.urlPathname.match(/^\/docs\/?$/) ? "/docs/index" : pageContext.urlPathname;
  const match = pages[`../../../../../assets/content/en-US${path}.mdx`];
  const page = await match();
  const markdown = await compile(page.default, { ...mdxOptions, outputFormat: "function-body" });
  return {
    pageContext: {
      pageProps: {
        markdown: markdown.toString(),
      },
    },
  };
}
