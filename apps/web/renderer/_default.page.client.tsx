import { Root, createRoot, hydrateRoot } from "react-dom/client";
import { PageShell } from "./PageShell";
import type { PageContextClient } from "./types";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

export { render };

export const hydrationCanBeAborted = true;
export const clientRouting = true;

let root: Root;
async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext;
  const key = "timelet";
  const cache = createCache({ key });
  const page = (
    <CacheProvider value={cache}>
      <PageShell pageContext={pageContext} emotionCache={cache}>
        <Page {...pageProps} />
      </PageShell>
    </CacheProvider>
  );
  const container = document.getElementById("page-view")!;

  if (pageContext.isHydration) {
    root = hydrateRoot(container, page);
  } else {
    if (!root) {
      root = createRoot(container);
    }
    root.render(page);
  }
}
