import type { RxCollection, RxDocument, RxJsonSchema, RxCollectionCreator } from 'rxdb';

const DEFAULT_PROFILE = 'default';

export type ProfileDocumentType = {
  profileId: string;
  userInterfaceLanguage?: string;
};

export type ProfileDocument = RxDocument<ProfileDocumentType>;

export type ProfileCollection = RxCollection<ProfileDocumentType>;

export const profileSchema: RxJsonSchema<ProfileDocumentType> = {
  title: 'profile schema',
  description: 'describes profiles',
  version: 1,
  type: 'object',
  properties: {
    profileId: {
      type: 'string',
      primary: true
    },
    userInterfaceLanguage: {
      type: 'string',
      description: 'Preferred ISO language for UI'
    }
  },
  required: []
};

export function configureProfileCollection(collection: ProfileCollection) {
  // insert default profile
  collection
    .findOne({ selector: { profileId: DEFAULT_PROFILE } })
    .exec()
    .then((doc) => {
      if (!doc) {
        collection.insert({ profileId: DEFAULT_PROFILE });
      }
    });
}

export const profileCreatorBase: RxCollectionCreator = {
  name: 'profiles',
  autoMigrate: true,
  schema: profileSchema,
  migrationStrategies: {
    1(previous: ProfileDocumentType) {
      return previous;
    }
  }
};
