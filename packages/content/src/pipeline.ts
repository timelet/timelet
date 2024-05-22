import { Collection, Configuration, Stage } from "./types";

export function createPipeline<T>(stages: Stage<T>[]): Stage<T> {
  return (input: T, collection: Collection, configuration?: Configuration): T => {
    return stages.reduce((currentValue, stage) => stage(currentValue, collection, configuration), input);
  };
}
