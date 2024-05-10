import { DataAsync } from "vike/types";
import { FeaturesType, getFeatures } from "../../data/features";

export type Data = {
  features: FeaturesType["features"];
};

export const data: DataAsync<Data> = async (pageContext) => {
  const features = await getFeatures(pageContext.locale?.key);
  return {
    features: features.features,
  };
};
