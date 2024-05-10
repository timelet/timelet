import { OnBeforeRouteSync } from "vike/types";
import { CONFIGURATION } from "./configuration";
import { generateAvailablePaths, translatePath } from "./utils/path";

export const onBeforeRoute: OnBeforeRouteSync = (pageContext): ReturnType<OnBeforeRouteSync> => {
  const { locale, path } = translatePath(pageContext.urlParsed.pathname, CONFIGURATION.LOCALES, CONFIGURATION.DEFAULT_LOCALE);
  const availableLocales = generateAvailablePaths(path, CONFIGURATION.LOCALES);

  return { pageContext: { locale, availableLocales, urlLogical: path } };
};
