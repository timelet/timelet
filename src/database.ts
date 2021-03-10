import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb';
import indexeddb from 'pouchdb-adapter-indexeddb';
import http from 'pouchdb-adapter-http';
import { EntryCollection, configureEntryCollection, entryCreatorBase } from './domain/collections/entryCollection';
import { ProfileCollection, configureProfileCollection, profileCreatorBase } from './domain/collections/profileCollection';
import { defaultSettings, SettingsDocumentType, SETTINGS_DOCUMENT_ID } from './domain/documents/settingsDocument';

export const DATABASE_NAME = 'timelet';

addRxPlugin(indexeddb);
addRxPlugin(http);

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

  database.collections.entries.sync({
    remote:
      'https://apikey-af38b9954191419baede07f40563a907:aff26ffcc21c6975105109047276dbad63e71a71@e947da22-7e92-4f30-a854-75903edc9746-bluemix.cloudant.com/timelet'
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
