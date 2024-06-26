import nodePath from "node:path";
import { FILE_TYPES, FileType, UNKNOWN_FILE_TYPE } from "../types";

export function isFileType(maybeType: unknown): maybeType is FileType {
  return typeof maybeType === "string" && FILE_TYPES.includes(maybeType as FileType);
}

export function determineFileType(path: string): FileType {
  const p = nodePath.parse(path);
  const t = p.ext.replace(".", "");

  if (isFileType(t)) {
    return t;
  }

  return UNKNOWN_FILE_TYPE;
}
