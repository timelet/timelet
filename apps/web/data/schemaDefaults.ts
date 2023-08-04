export function createSchemaDefinition(title: string, description: string) {
  return {
    title,
    description,
    $schema: "https://json-schema.org/draft/2020-12/schema",
    $id: `https://timelet.org/${title}.schema.json`,
  };
}
