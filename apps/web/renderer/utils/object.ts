import { Record } from "@sinclair/typebox";

export function swap(obj?: Record<string, string>) {
  if (!obj) return undefined;

  return Object.keys(obj).reduce(
    (ret, key) => {
      ret[obj[key]] = key;
      return ret;
    },
    {} as Record<string, string>
  );
}
