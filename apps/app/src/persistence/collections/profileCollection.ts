import type { RxCollection, RxDocument, RxJsonSchema, RxCollectionCreator } from "rxdb";

const DEFAULT_PROFILE = "default";

export type ProfileDocumentType = {
  profileId: string;
  userInterfaceLanguage?: string;
  categories: {
    name: string;
    description?: string;
  }[];
  tags: {
    name: string;
    description?: string;
  }[];
};

export type ProfileDocument = RxDocument<ProfileDocumentType>;

export type ProfileCollection = RxCollection<ProfileDocumentType>;

export const profileSchema: RxJsonSchema<ProfileDocumentType> = {
  title: "profiles",
  description: "describes profiles",
  version: 6,
  type: "object",
  primaryKey: "profileId",
  properties: {
    profileId: {
      type: "string",
    },
    userInterfaceLanguage: {
      type: "string",
      description: "Preferred language for UI",
    },
    categories: {
      type: "array",
      uniqueItems: true,
      description: "Categories in this profile",
      default: [],
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
        required: ["name"],
      },
    },
    tags: {
      type: "array",
      uniqueItems: true,
      description: "Tags in this profile",
      default: [],
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
        },
        required: ["name"],
      },
    },
  },
  required: [],
};

export function configureProfileCollection(collection: ProfileCollection) {
  // insert default profile
  collection
    .findOne({ selector: { profileId: DEFAULT_PROFILE } })
    .exec()
    .then((doc) => {
      if (!doc) {
        collection.insert({ profileId: DEFAULT_PROFILE, categories: [], tags: [] });
      }
    });
}

export const profileCreatorBase: RxCollectionCreator = {
  autoMigrate: true,
  schema: profileSchema,
  migrationStrategies: {
    1(previous: ProfileDocumentType) {
      return previous;
    },
  },
};
