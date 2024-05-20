import { Stage } from "./types";

export function createPipeline<T>(stages: Stage<T>[]): Stage<T> {
  return (input: T): T => {
    return stages.reduce((currentValue, stage) => stage(currentValue), input);
  };
}
