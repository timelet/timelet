import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { createSchemaDefinition } from "./schemaDefaults";

export enum FeatureKinds {
  boolean = "boolean",
  string = "string",
}

export const featuresSchema = Type.Object(
  {
    features: Type.Array(
      Type.Object({
        id: Type.String(),
        kind: Type.Enum(FeatureKinds),
        title: Type.String(),
        description: Type.String({ minLength: 20 }),
        promoted: Type.Boolean(),
      }),
      { uniqueItems: true }
    ),
  },
  createSchemaDefinition("features", "Describes features of time tracking software solutions.")
);

export type FeaturesType = Static<typeof featuresSchema>;
const featuresChecker = TypeCompiler.Compile(featuresSchema);

export async function getFeatures(locale: string = "en-US") {
  const features = await import(`../../../assets/content/${locale}/features.json`);

  if (!featuresChecker.Check(features)) {
    throw new Error(`Features aren't valid.`);
  }

  return features;
}
