import packageJson from "../package.json";

export const CONFIGURATION = {
  VERSION: packageJson.version,
  BASENAME: import.meta.env.DEV ? "/" : "/app/",
  PATHS: {
    DASHBOARD: "/",
  },
  STATE: {
    NAME: "vitrine-state",
  },
};
