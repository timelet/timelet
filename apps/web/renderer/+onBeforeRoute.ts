import { OnBeforeRouteAsync } from "vike/types";

export const onBeforeRoute: OnBeforeRouteAsync = async (pageContext) => {
  return { pageContext };
};
