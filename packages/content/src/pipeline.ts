import { Collection, CollectionStage, Configuration, Content, ContentStage } from "./types";

export function createContentPipeline(stages: ContentStage[]): ContentStage {
  return (content: Content, collection: Collection, configuration?: Configuration): Content => {
    return stages.reduce((currentValue, stage) => stage(currentValue, collection, configuration), content);
  };
}

export function createCollectionPipeline(stages: CollectionStage[]): CollectionStage {
  return (collection: Collection, configuration?: Configuration): Collection => {
    return stages.reduce((currentValue, stage) => stage(currentValue, configuration), collection);
  };
}
