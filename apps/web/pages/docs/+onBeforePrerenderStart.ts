import { glob } from "glob";
import { stripContentPath } from "../../renderer/utils/path";
import { OnBeforePrerenderStartAsync } from "vike/types";

export const onBeforePrerenderStart: OnBeforePrerenderStartAsync = async (): ReturnType<OnBeforePrerenderStartAsync> => {
  const paths = await glob("../../assets/content/en-US/**/*.mdx");
  return paths.map((p) => stripContentPath(p));
};
