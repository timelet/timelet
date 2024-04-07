import { MDXModule } from "mdx/types";
import { PageContext } from "../../../renderer/types";

const pages = import.meta.glob<MDXModule>("../../../../../assets/content/en-US/**/*.mdx");

export async function onBeforeRender(pageContext: PageContext) {
  const path = pageContext.urlPathname.match(/^\/docs\/?$/) ? "/docs/index" : pageContext.urlPathname;
  const match = pages[`../../../../../assets/content/en-US${path}.mdx`];
  const page = await match();
  return {
    pageContext: {
      pageProps: {
        markdown: page.default.toString(),
      },
    },
  };
}
