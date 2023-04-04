import packageJson from "../package.json";

export const CONFIGURATION = {
  VERSION: packageJson.version,
  BASENAME: import.meta.env.DEV ? "/" : "/app/",
  PATHS: {
    DASHBOARD: "/",
    WEBSITE: import.meta.env.DEV ? "http://localhost:3002" : "/",
    CODE: "https://github.com/timelet/timelet",
  },
  STATE: {
    NAME: "vitrine-state",
  },
};
