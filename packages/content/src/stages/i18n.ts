import { Content, Stage } from "../types";
import { translatePath } from "../utils/i18n";

export const i18nStage: Stage<Content> = (content, collection, configuration) => {
  if (!configuration?.i18n) return content;

  const { path, locale, pathWithoutLocale } = translatePath(content.url, configuration.i18n.locales, configuration.i18n.defaultLocale);
  return { ...content, url: path };
};
