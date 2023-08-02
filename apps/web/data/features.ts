import { Type } from '@sinclair/typebox';

export const featuresSchema = Type.Object({
  features: Type.Array(Type.Object({
    id: Type.String()
  }))
}, {
  title: "features",
  description: "Describes features of time tracking software solutions.",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://timelet.org/features.schema.json"
})
