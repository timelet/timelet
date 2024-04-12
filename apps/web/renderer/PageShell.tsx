import { PageContextProvider } from "./contexts/usePageContext";
import { ReactNode, StrictMode } from "react";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { TimeletUIProvider } from "@timelet/ui";
import { IntlProvider } from "react-intl";
import deCHMessages from "../../../assets/localization/de-CH.json";
import enUSMessages from "../../../assets/localization/en-US.json";
import { MDXProvider } from "@mdx-js/react";
import "./global.css";
import "@timelet/ui/style.css";
import { mdxComponents } from "../mdx.config";
import { PageContext } from "vike/types";

export function PageShell({ children, pageContext }: { children: ReactNode; pageContext: PageContext }) {
  const messages = pageContext.locale === "de-CH" ? deCHMessages : enUSMessages;
  return (
    <StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <IntlProvider messages={messages} locale="en-US" defaultLocale="en-US">
          <TimeletUIProvider>
            <MDXProvider components={mdxComponents}>
              <DefaultLayout>{children}</DefaultLayout>
            </MDXProvider>
          </TimeletUIProvider>
        </IntlProvider>
      </PageContextProvider>
    </StrictMode>
  );
}
