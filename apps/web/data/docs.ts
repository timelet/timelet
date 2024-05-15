import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { glob } from "glob";
import { read } from "to-vfile";
import { matter } from "vfile-matter";
import slugify from "limax";
import { CONFIGURATION } from "../renderer/configuration";
import { stripContentPath, translatePath } from "../renderer/utils/path";

export const docsFrontmatterSchema = Type.Object({
  title: Type.String({ minLength: 3 }),
  slug: Type.Optional(Type.String({ minLength: 3 })),
});

export type DocsFrontmatterSchema = Static<typeof docsFrontmatterSchema>;
const docsFrontmatterChecker = TypeCompiler.Compile(docsFrontmatterSchema);

async function readFiles(base: string, path: string) {
  const files = await glob(`${base}${path}`);
  const index = files.map(async (file) => {
    const vfile = await read(file);
    matter(vfile);

    if (!docsFrontmatterChecker.Check(vfile.data.matter)) {
      throw new Error(`Frontmatter isn't valid.`);
    }

    const frontmatter = vfile.data.matter as DocsFrontmatterSchema;
    const slug = slugify(frontmatter.slug || frontmatter.title, { tone: false });
    const path = stripContentPath(file.replace(base, "/"));
    const { translatedPath, locale, path: pathWithoutLocale } = translatePath(path, CONFIGURATION.LOCALES, CONFIGURATION.DEFAULT_LOCALE);

    return {
      path,
      pathWithoutLocale,
      file,
      url: translatedPath,
      locale,
      meta: { ...frontmatter, slug },
    };
  });

  const resolvedIndex = await Promise.all(index);
  const translatedIndex = resolvedIndex.map((item) => {
    const translations = resolvedIndex.filter((i) => item.pathWithoutLocale === i.pathWithoutLocale);
    return { ...item, translations: translations.map((t) => ({ locale: t.locale, path: t.url })) };
  });

  return translatedIndex;
}

export async function getDocsIndex(base: string, path: string) {
  return await readFiles(base, path);
}
