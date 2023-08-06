import { hydrateRoot } from "react-dom/client";
import { PageShell } from "./PageShell";
import type { PageContextClient } from "./types";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

export { render };

export const hydrationCanBeAborted = true;
export const clientRouting = true;

async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext;
  const key = "timelet";
  const cache = createCache({ key });
  hydrateRoot(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("page-view")!,
    <CacheProvider value={cache}>
      <PageShell pageContext={pageContext} emotionCache={cache}>
        <Page {...pageProps} />
      </PageShell>
    </CacheProvider>
  );
}
