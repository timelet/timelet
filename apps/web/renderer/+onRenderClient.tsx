import { Root, createRoot, hydrateRoot } from "react-dom/client";
import { PageShell } from "./PageShell";
import { PageContextClient } from "vike/types";

let root: Root;
export async function onRenderClient(pageContext: PageContextClient) {
  const { Page, pageProps, headProps } = pageContext;
  const page = (
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  );
  const container = document.getElementById("page-view")!;

  if (pageContext.isHydration) {
    root = hydrateRoot(container, page);
  } else {
    document.title = headProps?.title ? `${headProps.title} - Timelet` : "Timelet";
    if (pageContext.kind) {
      document.body.classList.add(pageContext.kind);
    } else {
      document.body.removeAttribute("class");
    }
    if (!root) {
      root = createRoot(container);
    }
    root.render(page);
  }
}
