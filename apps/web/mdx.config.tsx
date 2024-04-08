import { Options } from "@mdx-js/rollup";
import { Title } from "@timelet/ui";
import { MDXComponents } from "mdx/types";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

export const mdxOptions: Options = { remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter] };
export const mdxComponents: MDXComponents = {
  h1: (props) => <Title {...props} />,
};
