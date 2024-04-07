import { run } from "@mdx-js/mdx";
import { Fragment, useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";

type PageProps = {
  markdown: string;
};

export function Page({ markdown }: PageProps) {
  const [mdxModule, setMdxModule] = useState();
  const Content = mdxModule ? mdxModule : Fragment;

  useEffect(
    function () {
      (async function () {
        setMdxModule(await run(markdown, { ...runtime, baseUrl: import.meta.url }));
      })();
    },
    [markdown]
  );

  return <Content />;
}
