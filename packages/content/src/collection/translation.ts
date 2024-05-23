import { CollectionStage } from "../types";

export const translationCollectionStage: CollectionStage = (collection) => {
  const contents = collection.contents.map((c) => {
    const translations = collection.contents.filter((i) => c.l10n?.pathWithoutLocale === i.l10n?.pathWithoutLocale);
    return { ...c, translations: translations.map((t) => ({ locale: t.l10n?.locale, path: t.url })) };
  });
  return { ...collection, contents };
};
