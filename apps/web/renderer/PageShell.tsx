import { PageContextProvider } from "./contexts/usePageContext";
import type { PageContext } from "./types";
import { ReactNode, StrictMode } from "react";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { TimeletUIProvider } from "@timelet/ui";
import { GlobalStyles } from "./GlobalStyles";
import { IntlProvider } from "react-intl";
import deCHMessages from "../../../assets/localization/de-CH.json";
import enUSMessages from "../../../assets/localization/en-US.json";

export function PageShell({ children, pageContext }: { children: ReactNode; pageContext: PageContext }) {
  const messages = pageContext.locale === "de-CH" ? deCHMessages : enUSMessages;
  return (
    <StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <IntlProvider messages={messages} locale="en-US" defaultLocale="en-US">
          <TimeletUIProvider withGlobalStyles withNormalizeCSS>
            <GlobalStyles />
            <DefaultLayout>{children}</DefaultLayout>
          </TimeletUIProvider>
        </IntlProvider>
      </PageContextProvider>
    </StrictMode>
  );
}
