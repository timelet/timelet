import type { RxCollection, RxDocument, RxJsonSchema, RxCollectionCreator } from 'rxdb';
import { v4 } from 'uuid';

export type CategoryDocumentType = {
  categoryId?: string;
  name: string;
  description: string;
};

export type CategoryDocument = RxDocument<CategoryDocumentType>;

export type CategoryCollection = RxCollection<CategoryDocumentType>;

export const categorySchema: RxJsonSchema<CategoryDocumentType> = {
  title: 'category schema',
  description: 'describes categories',
  version: 1,
  type: 'object',
  properties: {
    categoryId: {
      type: 'string',
      primary: true
    },
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    }
  },
  required: ['name']
};

export function configureCategoryCollection(collection: CategoryCollection) {
  collection.preInsert((data) => {
    // eslint-disable-next-line no-param-reassign
    data.categoryId = v4();
  }, false);
}

export const categoryCreatorBase: RxCollectionCreator = {
  name: 'categories',
  schema: categorySchema,
  migrationStrategies: {
    1(previous: CategoryCollection) {
      return previous;
    }
  }
};
