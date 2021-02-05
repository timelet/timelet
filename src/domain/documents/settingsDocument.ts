export const SETTINGS_DOCUMENT_ID = 'settings';

export type SettingsDocumentType = {
  profile: string;
};

export const defaultSettings: SettingsDocumentType = {
  profile: 'default'
};
