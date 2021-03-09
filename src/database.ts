import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb';
import indexeddb from 'pouchdb-adapter-indexeddb';
import { EntryCollection, configureEntryCollection, entryCreatorBase } from './domain/collections/entryCollection';
import { ProfileCollection, configureProfileCollection, profileCreatorBase } from './domain/collections/profileCollection';
import { defaultSettings, SettingsDocumentType, SETTINGS_DOCUMENT_ID } from './domain/documents/settingsDocument';

export const DATABASE_NAME = 'timelet';

addRxPlugin(indexeddb);

export type DatabaseCollections = {
  entries: EntryCollection;
  profiles: ProfileCollection;
};

export type TimeletDatabase = RxDatabase<DatabaseCollections>;

export async function initializeDatabase() {
  // Set up database
  const database: TimeletDatabase = await createRxDatabase<DatabaseCollections>({
    name: DATABASE_NAME,
    adapter: 'indexeddb'
  });

  // Configure collections
  await database.addCollections({
    entries: entryCreatorBase,
    profiles: profileCreatorBase
  });

  configureEntryCollection(database.entries);
  configureProfileCollection(database.profiles);

  // Seed default settings
  try {
    await database.insertLocal<SettingsDocumentType>(SETTINGS_DOCUMENT_ID, defaultSettings);
  } catch (e) {
    // Settings already initialized
  }

  return database;
}
