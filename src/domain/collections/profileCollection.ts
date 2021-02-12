import type { RxCollection, RxDocument, RxJsonSchema, RxCollectionCreator } from 'rxdb';

const DEFAULT_PROFILE = 'default';

export type ProfileDocumentType = {
  profileId: string;
  userInterfaceLanguage?: string;
  categories: {
    name: string;
    description?: string;
  }[];
};

export type ProfileDocument = RxDocument<ProfileDocumentType>;

export type ProfileCollection = RxCollection<ProfileDocumentType>;

export const profileSchema: RxJsonSchema<ProfileDocumentType> = {
  title: 'profile schema',
  description: 'describes profiles',
  version: 3,
  type: 'object',
  properties: {
    profileId: {
      type: 'string',
      primary: true
    },
    userInterfaceLanguage: {
      type: 'string',
      description: 'Preferred ISO language for UI'
    },
    categories: {
      type: 'array',
      uniqueItems: true,
      description: 'Categories in this profile',
      default: [],
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          description: {
            type: 'string'
          }
        },
        required: ['name']
      }
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
        collection.insert({ profileId: DEFAULT_PROFILE, categories: [] });
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
    },
    2(previous: ProfileDocumentType) {
      return previous;
    },
    3(previous: ProfileDocumentType) {
      return {
        ...previous,
        categories: previous.categories ?? []
      };
    }
  }
};
