import { IntlConfig } from 'react-intl';

export const languages = ['de', 'en'] as const;
export type Language = typeof languages[number];
export type IntlMessages = { [key in Language]: IntlConfig['messages'] };

export const userInterfaceLanguages: Language[] = ['de', 'en'];
export const defaultUserInterfaceLanguage: Language = 'de';
