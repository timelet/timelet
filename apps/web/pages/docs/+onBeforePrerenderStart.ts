import { glob } from "glob";

export async function onBeforePrerenderStart() {
  const paths = await glob("../../assets/content/en-US/**/*.mdx");
  return paths.map((p) => p.replace("../../assets/content/en-US", "").replace(".mdx", "").replace("index", ""));
}
