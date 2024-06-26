import { translatePath } from "@timelet/i18n";
import { ContentStage } from "../types";

export const i18nContentStage: ContentStage = (content, _, configuration) => {
  if (!configuration?.i18n) return content;

  const { path, locale, pathWithoutLocale } = translatePath(content.url, configuration.i18n.locales, configuration.i18n.defaultLocale);
  return { ...content, url: path, l10n: { locale, pathWithoutLocale } };
};
