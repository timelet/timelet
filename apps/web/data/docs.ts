import { Static, Type } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import { glob } from "glob";
import { read } from "to-vfile";
import { matter } from "vfile-matter";
import slugify from "limax";
import { findClosestLocale, splitLocaleFromURL } from "../renderer/utils/locale";
import { CONFIGURATION } from "../renderer/configuration";
import { replaceSegments } from "../renderer/utils/path";

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
    const path = file.replace(base, "");
    const { locale: localeKey, path: pathWithoutLocale } = splitLocaleFromURL(path, CONFIGURATION.DEFAULT_LOCALE);
    const closestLocale =
      findClosestLocale(
        localeKey,
        CONFIGURATION.LOCALES.map((l) => l.key)
      ) || CONFIGURATION.DEFAULT_LOCALE;
    const locale = CONFIGURATION.LOCALES.find((l) => l.key === closestLocale)!;
    let url = `${locale.slug}/${pathWithoutLocale}`;
    url = url.replace("index", "").replace(".mdx", "");
    url = replaceSegments(url, locale.routes);

    return {
      path,
      pathWithoutLocale,
      file,
      url,
      locale,
      meta: { ...frontmatter, slug },
    };
  });

  const resolvedIndex = await Promise.all(index);
  const translatedIndex = resolvedIndex.map((item) => {
    const translations = resolvedIndex.filter((i) => item.pathWithoutLocale === i.pathWithoutLocale && item.locale.key !== i.locale.key);
    return { ...item, translations };
  });

  return translatedIndex;
}

export async function getDocsIndex(base: string, path: string) {
  return await readFiles(base, path);
}

export async function getSomething() {
  return await glob("*");
}
