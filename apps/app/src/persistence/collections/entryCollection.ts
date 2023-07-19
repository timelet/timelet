import type { RxCollection, RxDocument, RxJsonSchema, RxCollectionCreator } from "rxdb";
import { v4 } from "uuid";

export type EntryDocumentType = {
  entryId?: string;
  description?: string;
  startedAt: number;
  endedAt?: number;
  category: string;
  tag?: string;
};

export type EntryDocument = RxDocument<EntryDocumentType>;

export type EntryCollection = RxCollection<EntryDocumentType>;

export const entrySchema: RxJsonSchema<EntryDocumentType> = {
  title: "entries",
  description: "describes time entries",
  version: 8,
  type: "object",
  primaryKey: "entryId",
  properties: {
    entryId: {
      type: "string",
    },
    description: {
      type: "string",
    },
    startedAt: {
      type: "number",
      description: "UNIX timestamp of an activities starting point",
    },
    endedAt: {
      type: "number",
      description: "UNIX timestamp of an activities ending point",
    },
    category: {
      type: "string",
      description: "Category of this entry",
    },
    tag: {
      type: "string",
      description: "Tags of this entry",
    },
  },
  required: ["category", "startedAt"],
};

export function configureEntryCollection(collection: EntryCollection) {
  collection.preInsert((data) => {
    // eslint-disable-next-line no-param-reassign
    data.entryId = v4();
  }, false);
}

export const entryCreatorBase: RxCollectionCreator = {
  schema: entrySchema,
  migrationStrategies: {
    1(previous: EntryDocumentType) {
      return previous;
    },
  },
};
