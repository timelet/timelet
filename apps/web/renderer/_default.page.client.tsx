import { hydrateRoot } from "react-dom/client";
import { PageShell } from "./PageShell";
import type { PageContextClient } from "./types";

export { render };

async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext;
  hydrateRoot(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById("page-view")!,
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  );
}

export const clientRouting = true;
