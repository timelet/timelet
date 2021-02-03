import type { RxCollection, RxDocument, RxJsonSchema, RxCollectionCreator } from 'rxdb';
import { v4 } from 'uuid';

export type SettingDocumentType = {
  settingId?: string;
  name: string;
  userInterfaceLanguage?: string;
};

export type SettingDocument = RxDocument<SettingDocumentType>;

export type SettingCollection = RxCollection<SettingDocumentType>;

export const settingSchema: RxJsonSchema<SettingDocumentType> = {
  title: 'setting schema',
  description: 'describes settings',
  version: 1,
  type: 'object',
  properties: {
    settingId: {
      type: 'string',
      primary: true
    },
    name: {
      type: 'string'
    },
    userInterfaceLanguage: {
      type: 'string',
      description: 'Preferred ISO language for UI'
    }
  },
  required: ['name']
};

export function configureSettingCollection(collection: SettingCollection) {
  collection.preInsert((data) => {
    // eslint-disable-next-line no-param-reassign
    data.settingId = v4();
  }, false);
}

export const settingCreatorBase: RxCollectionCreator = {
  name: 'settings',
  autoMigrate: true,
  schema: settingSchema,
  migrationStrategies: {
    1(previous: SettingDocumentType) {
      return previous;
    },
  }
};
