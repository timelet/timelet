import ReactDOMServer from "react-dom/server";
import { PageShell } from "./PageShell";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr/server";
import type { PageContextServer } from "./types";
import createCache from "@emotion/cache";
import createEmotionCache from "@emotion/server/create-instance";
import { CacheProvider } from "@emotion/react";

export { render };
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ["pageProps", "locale"];

async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext;
  const key = "timelet";
  const cache = createCache({ key });
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionCache(cache);

  const pageHtml = ReactDOMServer.renderToString(
    <CacheProvider value={cache}>
      <PageShell pageContext={pageContext}>
        <Page {...pageProps} />
      </PageShell>
    </CacheProvider>
  );

  const chunks = extractCriticalToChunks(pageHtml);
  const styles = constructStyleTagsFromChunks(chunks);

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext.exports;
  const title = (documentProps && documentProps.title) || "Timelet";
  const desc = (documentProps && documentProps.description) || "Distributed collaborative offline-first time tracking app.";

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ff5722" />
        <meta name="msapplication-TileColor" content="#cc441b" />
        <meta name="theme-color" content="#e6e6e6" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
        ${dangerouslySkipEscape(styles)}
      </head>
      <body${documentProps?.slug ? ` class=${documentProps.slug}` : ""}>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  };
}
