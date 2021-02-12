import type { RxCollection, RxDocument, RxJsonSchema, RxCollectionCreator } from 'rxdb';
import { v4 } from 'uuid';

export type EntryDocumentType = {
  entryId?: string;
  description: string;
  startedAt: string;
  endedAt?: string;
  category?: string;
};

export type EntryDocument = RxDocument<EntryDocumentType>;

export type EntryCollection = RxCollection<EntryDocumentType>;

export const entrySchema: RxJsonSchema<EntryDocumentType> = {
  title: 'entry schema',
  description: 'describes time entries',
  version: 5,
  type: 'object',
  properties: {
    entryId: {
      type: 'string',
      primary: true
    },
    description: {
      type: 'string'
    },
    startedAt: {
      type: 'string',
      description: 'ISO date string of an activities starting point'
    },
    endedAt: {
      type: 'string',
      description: 'ISO date string of an activities ending point'
    },
    category: {
      type: 'string',
      description: 'Category of this entry'
    }
  },
  required: ['description', 'startedAt']
};

export function configureEntryCollection(collection: EntryCollection) {
  collection.preInsert((data) => {
    // eslint-disable-next-line no-param-reassign
    data.entryId = v4();
  }, false);
}

export const entryCreatorBase: RxCollectionCreator = {
  name: 'entries',
  schema: entrySchema,
  migrationStrategies: {
    1(previous: EntryDocumentType) {
      return previous;
    },
    2(previous: EntryDocumentType) {
      return {
        ...previous,
        startedAt: new Date(previous.startedAt).toISOString(),
        endedAt: previous.endedAt ? new Date(previous.endedAt).toISOString() : undefined
      };
    },
    3(previous: EntryDocumentType) {
      return {
        ...previous,
        startedAt: new Date(previous.startedAt).toISOString(),
        endedAt: previous.endedAt === 'Undefined' ? undefined : previous.endedAt
      };
    },
    4(previous: EntryDocumentType) {
      return {
        ...previous
      };
    },
    5(previous: EntryDocumentType) {
      return {
        ...previous
      };
    }
  }
};
