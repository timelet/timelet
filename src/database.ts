import { addRxPlugin, createRxDatabase, RxDatabase } from "rxdb";
import { EntryCollection, entrySchema, configureEntryCollection } from "./collections/entryCollection";
import indexeddb from 'pouchdb-adapter-indexeddb';

addRxPlugin(indexeddb);

type DatabaseCollections = {
    entries: EntryCollection;
}

export type TimeletDatabase = RxDatabase<DatabaseCollections>;

export async function initializeDatabase() {
    const database: TimeletDatabase = await createRxDatabase<DatabaseCollections>({
        name: 'timelet',
        adapter: 'indexeddb'
    });

    await database.addCollections({
        entries: {
            schema: entrySchema
        }
    });

    configureEntryCollection(database.entries);

    return database;
}