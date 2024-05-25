import { translationCollectionStage } from "./collection/translation";
import { i18nContentStage } from "./content/i18n";
import { jsonContentStage } from "./content/json";
import { mdxContentStage } from "./content/mdx";
import { urlContentStage } from "./content/url";
import { Collection, CollectionStage, Configuration, Content, ContentStage } from "./types";

export function createContentPipeline(stages: ContentStage[]): ContentStage {
  return (content: Content, collection: Collection, configuration?: Configuration): Content => {
    return stages.reduce((currentValue, stage) => stage(currentValue, collection, configuration), content);
  };
}

export function getContentPipeline(): ContentStage {
  return createContentPipeline([urlContentStage, jsonContentStage, mdxContentStage, i18nContentStage]);
}

export function createCollectionPipeline(stages: CollectionStage[]): CollectionStage {
  return (collection: Collection, configuration?: Configuration): Collection => {
    return stages.reduce((currentValue, stage) => stage(currentValue, configuration), collection);
  };
}

export function getCollectionPipeline(): CollectionStage {
  return createCollectionPipeline([translationCollectionStage]);
}
