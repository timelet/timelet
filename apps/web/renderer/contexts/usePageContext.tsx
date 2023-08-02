// `usePageContext` allows us to access `pageContext` in any React component.
// See https://vite-plugin-ssr.com/pageContext-anywhere

import { createContext, useContext } from "react";
import type { PageContext } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Context = createContext<PageContext>(undefined as any);

export function PageContextProvider({ pageContext, children }: { pageContext: PageContext; children: React.ReactNode }) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>;
}

export function usePageContext() {
  const pageContext = useContext(Context);
  return pageContext;
}
