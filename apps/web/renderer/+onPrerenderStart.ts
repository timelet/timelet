import { OnPrerenderStartSync, PageContextServer } from "vike/types";
import { CONFIGURATION } from "./configuration";

export const onPrerenderStart: OnPrerenderStartSync = (prerenderContext) => {
  const pageContexts: PageContextServer[] = [];

  prerenderContext.pageContexts.forEach((pageContext) => {
    Object.entries(CONFIGURATION.LOCALES).forEach(([locale, localeDetails]) => {
      let urlOriginal = pageContext.urlOriginal;
      if (locale !== CONFIGURATION.DEFAULT_LOCALE) {
        urlOriginal = `/${localeDetails.slug}/${urlOriginal}`;
      }
      pageContexts.push({ ...pageContext, urlOriginal, locale: localeDetails });
    });
  });

  return { prerenderContext: { pageContexts } };
};
