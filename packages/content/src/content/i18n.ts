import { Content, ContentStage } from "../types";
import { translatePath } from "../utils/i18n";

export const i18nContentStage: ContentStage<Content> = (content, _, configuration) => {
  if (!configuration?.i18n) return content;

  const { path, locale, pathWithoutLocale } = translatePath(content.url, configuration.i18n.locales, configuration.i18n.defaultLocale);
  return { ...content, url: path, l10n: { locale, pathWithoutLocale } };
};
