import { Collection, Configuration, ContentStage } from "./types";

export function createContentPipeline<T>(stages: ContentStage<T>[]): ContentStage<T> {
  return (input: T, collection: Collection, configuration?: Configuration): T => {
    return stages.reduce((currentValue, stage) => stage(currentValue, collection, configuration), input);
  };
}
