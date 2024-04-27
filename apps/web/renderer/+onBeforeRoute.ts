import { OnBeforeRouteSync } from "vike/types";
import { splitLocaleFromURL } from "./utils/locale";
import { CONFIGURATION } from "./configuration";

export const onBeforeRoute: OnBeforeRouteSync = (pageContext) => {
  const { locale, path } = splitLocaleFromURL(pageContext.urlParsed.pathname, CONFIGURATION.DEFAULT_LOCALE);
  const urlLogical = pageContext.urlOriginal.replace(pageContext.urlParsed.pathname, path);

  return { pageContext: { locale, urlLogical } };
};
