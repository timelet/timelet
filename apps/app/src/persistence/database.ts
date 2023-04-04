import { RxDatabase, createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { EntryCollection, configureEntryCollection, entryCreatorBase } from "./collections/entryCollection";
import { ProfileCollection, configureProfileCollection, profileCreatorBase } from "./collections/profileCollection";

export type DatabaseCollections = {
  entries: EntryCollection;
  profiles: ProfileCollection;
};

export type TimeletDatabase = RxDatabase<DatabaseCollections>;

export async function initialize() {
  // Set up persistence
  const database = await createRxDatabase<DatabaseCollections>({
    name: "timelet",
    storage: getRxStorageDexie(),
  });

  // Configure collections
  await database.addCollections({
    entries: entryCreatorBase,
    profiles: profileCreatorBase,
  });


  configureEntryCollection(database.entries);
  configureProfileCollection(database.profiles);

  return database;
}
