import { PageContextProvider } from "./usePageContext";
import type { PageContext } from "./types";
import { ReactNode, StrictMode } from "react";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { ThemeProvider } from "@timelet/ui";

export function PageShell({ children, pageContext }: { children: ReactNode; pageContext: PageContext }) {
  return (
    <StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <ThemeProvider withGlobalStyles withNormalizeCSS>
          <DefaultLayout>{children}</DefaultLayout>
        </ThemeProvider>
      </PageContextProvider>
    </StrictMode>
  );
}
