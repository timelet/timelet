import { useDatabase } from "../persistence/DatabaseProvider";
import { EntryDocument } from "../persistence/collections/entryCollection";

export function createEntryAction(entry: EntryDocument) {
  return useDatabase()?.collections.entries.insert(entry);
}

export function indexEntriesAction() {}
