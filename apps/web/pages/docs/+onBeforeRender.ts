import { compile } from "@mdx-js/mdx";
import { mdxOptions } from "../../mdx.config";
import { read } from "to-vfile";
import { matter } from "vfile-matter";
import { OnBeforeRenderAsync } from "vike/types";
import docs from "../../../../assets/content/docs.json";

export const onBeforeRender: OnBeforeRenderAsync = async (pageContext): ReturnType<OnBeforeRenderAsync> => {
  const doc = docs.find((doc) => pageContext.locale?.key === doc.locale.key && pageContext.urlOriginal.includes(doc.url));

  if (!doc) {
    return;
  }

  const vfile = await read(doc.file);
  matter(vfile, { strip: true });
  const frontmatter = vfile.data.matter as { title: string };
  const markdown = await compile(vfile, { ...mdxOptions, outputFormat: "function-body" });

  return {
    pageContext: {
      availableLocales: doc.translations,
      kind: "docs",
      headProps: {
        title: frontmatter.title,
      },
      pageProps: {
        markdown: markdown.toString(),
      },
    },
  };
};
