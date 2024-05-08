import packageJson from "../package.json";
import { FlattenValues, Locale } from "../types";

export const CONFIGURATION = {
  VERSION: packageJson.version,
  DEFAULT_LOCALE: "en-US",
  LOCALES: [
    {
      key: "en-US",
      name: "English",
      slug: "en",
    },
    {
      key: "de-CH",
      name: "Deutsch",
      slug: "de",
    },
  ] satisfies Locale[],
  PATHS: {
    APP: import.meta.env.DEV ? "http://localhost:3001" : "/app",
    CODE: "https://github.com/timelet/timelet",
    DOCS: "/docs/",
    CONTENT: "../../assets/content",
  },
  CONTENT: {
    PAGES: {
      DOCS: "docs/**/*.mdx",
    },
    SECTIONS: {
      FEATURES: "features.json",
    },
  },
} as const;

export const INTERPOLATE = {
  CONTENT_PATH: (locale: Locale, content: FlattenValues<typeof CONFIGURATION.CONTENT>) => {
    return `${CONFIGURATION.PATHS.CONTENT}/${locale.key}/${content}`;
  },
} as const;
