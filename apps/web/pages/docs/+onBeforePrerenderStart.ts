import { glob } from "glob";
import { stripContentPath, translatePath } from "../../renderer/utils/path";
import { OnBeforePrerenderStartAsync } from "vike/types";
import { CONFIGURATION } from "../../renderer/configuration";

export const onBeforePrerenderStart: OnBeforePrerenderStartAsync = async (): ReturnType<OnBeforePrerenderStartAsync> => {
  const paths = await glob(`${CONFIGURATION.PATHS.CONTENT}/*/docs/**/*.mdx`);
  return paths.map((p) => translatePath(stripContentPath(p)).translatedPath);
};
