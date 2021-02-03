import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb';
import indexeddb from 'pouchdb-adapter-indexeddb';
import { EntryCollection, configureEntryCollection, entryCreatorBase } from './collections/entryCollection';
import { SettingCollection, configureSettingCollection, settingCreatorBase } from './collections/settingCollection';

addRxPlugin(indexeddb);

type DatabaseCollections = {
  entries: EntryCollection;
  settings: SettingCollection;
};

export type TimeletDatabase = RxDatabase<DatabaseCollections>;

export async function initializeDatabase() {
  const database: TimeletDatabase = await createRxDatabase<DatabaseCollections>({
    name: 'timelet',
    adapter: 'indexeddb'
  });

  await database.addCollections({
    entries: entryCreatorBase,
    settings: settingCreatorBase
  });

  configureEntryCollection(database.entries);
  configureSettingCollection(database.settings);

  return database;
}
