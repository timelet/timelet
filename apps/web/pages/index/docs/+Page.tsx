import { RunOptions, runSync } from "@mdx-js/mdx";
import { useMDXComponents } from "@mdx-js/react";
import * as jsxRuntime from "react/jsx-runtime";

type PageProps = {
  markdown: string;
};

export function Page({ markdown }: PageProps) {
  const page = runSync(markdown, { ...(jsxRuntime as RunOptions) });
  const Content = page?.default;
  const components = useMDXComponents();

  return <section>{Content && <Content components={components} />}</section>;
}
