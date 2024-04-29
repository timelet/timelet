import ReactDOMServer from "react-dom/server";
import { PageShell } from "./PageShell";
import { escapeInject, dangerouslySkipEscape } from "vike/server";
import { OnRenderHtmlAsync } from "vike/types";

export const onRenderHtml: OnRenderHtmlAsync = async (pageContext) => {
  const { Page, pageProps, headProps } = pageContext;

  const pageHtml = ReactDOMServer.renderToString(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  );

  const title = headProps?.title ? `${headProps.title} - Timelet` : "Timelet";
  const description = headProps?.description || "Distributed collaborative offline-first time tracking app.";

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
        <meta name="description" content="${description}" />
        <title>${title}</title>
      </head>
      <body${pageContext.kind ? ` class=${pageContext.kind}` : ""}>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
    },
  };
};
