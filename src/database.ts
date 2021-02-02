import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb';
import indexeddb from 'pouchdb-adapter-indexeddb';
import { EntryCollection, configureEntryCollection, entryCreatorBase } from './collections/entryCollection';

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
    entries: entryCreatorBase
  });

  configureEntryCollection(database.entries);

  return database;
}
