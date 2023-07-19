import packageJson from "../package.json";

export const CONFIGURATION = {
  VERSION: packageJson.version,
  PATHS: {
    APP: import.meta.env.DEV ? "http://localhost:3001" : "./app",
    CODE: "https://github.com/timelet/timelet",
  },
};
