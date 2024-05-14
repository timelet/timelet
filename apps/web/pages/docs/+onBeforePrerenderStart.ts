import { OnBeforePrerenderStartSync } from "vike/types";
import docs from "../../../../assets/content/docs.json";

export const onBeforePrerenderStart: OnBeforePrerenderStartSync = (): ReturnType<OnBeforePrerenderStartSync> => {
  return docs.map((doc) => ({ url: doc.url, pageContext: { locale: doc.locale } }));
};
