import { OnBeforeRenderSync } from "vike/types";

export const onBeforeRender: OnBeforeRenderSync = (): ReturnType<OnBeforeRenderSync> => {
  return {
    pageContext: {
      kind: "landing",
    },
  };
};
