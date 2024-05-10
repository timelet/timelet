import { RouteSync } from "vike/types";

export const route: RouteSync = (pageContext): ReturnType<RouteSync> => {
  if (pageContext.urlPathname.startsWith("/docs") || pageContext.urlPathname.startsWith("/doku")) {
    return true;
  }
  return false;
};
