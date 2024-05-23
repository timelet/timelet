import { readSync } from "to-vfile";
import { matter } from "vfile-matter";
import { ContentStage } from "../types";
import slugify from "limax";

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
    } else {
      c.meta = { ...c.meta, ...frontmatter };
    }
  }

  return c;
};
