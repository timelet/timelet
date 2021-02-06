import { defaultUserInterfaceLanguage, Language } from '../domain/models/languageModel';

/* eslint-disable import/prefer-default-export */
export const matchLanguage = (language: string, availableLanguages: Language[]): Language => {
  const match = availableLanguages.find((l) => l === language.slice(0, 2));
  return match ?? defaultUserInterfaceLanguage;
};
