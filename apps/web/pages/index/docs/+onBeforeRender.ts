import { compile } from "@mdx-js/mdx";
import { mdxOptions } from "../../../mdx.config";
import { glob } from "glob";
import { read } from "to-vfile";
import { matter } from "vfile-matter";
import { PageContext } from "vike/types";

export async function onBeforeRender(pageContext: PageContext) {
  const files = await glob("../../assets/content/en-US/**/*.mdx");
  const path = pageContext.urlPathname.match(/^\/docs\/?$/) ? "/docs/index" : pageContext.urlPathname;
  const file = files.find((f) => f === `../../assets/content/en-US${path}.mdx`);

  if (!file) {
    return;
  }

  const vfile = await read(file);
  matter(vfile, { strip: true });
  const frontmatter = vfile.data.matter as { title: string };
  const markdown = await compile(vfile, { ...mdxOptions, outputFormat: "function-body" });

  return {
    pageContext: {
      kind: "docs",
      headProps: {
        title: frontmatter.title,
      },
      pageProps: {
        markdown: markdown.toString(),
      },
    },
  };
}
