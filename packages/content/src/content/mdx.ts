import { readSync } from "to-vfile";
import { matter } from "vfile-matter";
import { ContentStage } from "../types";
import slugify from "limax";
import nodePath from "node:path";

export const mdxContentStage: ContentStage = (content) => {
  const c = content;

  if (content.type === "mdx") {
    const vfile = readSync(content.file);
    matter(vfile);
    const frontmatter = vfile.data.matter as Record<string, string>;

    if (!c.url.endsWith("/")) {
      let slug = c.meta?.slug || "";
      if (frontmatter.title && !frontmatter.slug) slug = slugify(frontmatter.title);
      c.meta = { ...c.meta, slug, ...frontmatter };
      const parsedPath = nodePath.parse(c.url);
      c.url = nodePath.join(parsedPath.dir, slug);
    } else {
      c.meta = { ...c.meta, ...frontmatter };
    }
  }

  return c;
};
