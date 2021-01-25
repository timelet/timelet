import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb';
import indexeddb from 'pouchdb-adapter-indexeddb';
import { EntryCollection, entrySchema, configureEntryCollection, EntryDocumentType } from './collections/entryCollection';

addRxPlugin(indexeddb);

type DatabaseCollections = {
  entries: EntryCollection;
};

export type TimeletDatabase = RxDatabase<DatabaseCollections>;

export async function initializeDatabase() {
  const database: TimeletDatabase = await createRxDatabase<DatabaseCollections>({
    name: 'timelet',
    adapter: 'indexeddb'
  });

  await database.addCollections({
    entries: {
      schema: entrySchema,
      migrationStrategies: {
        1(previous: EntryDocumentType){
          return previous;
        }
      }
    }
  });

  configureEntryCollection(database.entries);

  return database;
}
