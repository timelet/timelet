import { Collection } from "./types";

const watches: Collection[] = [];

export function watchCollection(collection: Collection) {
  watches.push(collection);
}

export function getWatches() {
  return watches;
}
