import { OnPrerenderStartSync, PageContextServer } from "vike/types";
import { CONFIGURATION } from "./configuration";
import { createLocalePath, replaceSegments } from "./utils/path";

export const onPrerenderStart: OnPrerenderStartSync = (prerenderContext): ReturnType<OnPrerenderStartSync> => {
  const pageContexts: PageContextServer[] = [];

  prerenderContext.pageContexts.forEach((pageContext) => {
    if (pageContext.locale) {
      pageContexts.push({ ...pageContext, urlOriginal: pageContext.urlOriginal });
    } else {
      CONFIGURATION.LOCALES.forEach((locale) => {
        let urlOriginal = pageContext.urlOriginal;

        urlOriginal = createLocalePath(urlOriginal, locale);
        urlOriginal = replaceSegments(urlOriginal, locale.routes);

        pageContexts.push({ ...pageContext, urlOriginal, locale });
      });
    }
  });

  return { prerenderContext: { pageContexts } };
};
