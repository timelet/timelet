import packageJson from "../package.json";
import { FlattenValues, Locale } from "../types";

const LOCALES = {
  "en-US": {
    name: "English",
    slug: "en",
  },
  "de-CH": {
    name: "Deutsch",
    slug: "de",
  },
} satisfies Record<string, Locale>;

export const CONFIGURATION = {
  VERSION: packageJson.version,
  DEFAULT_LOCALE: "en-US" satisfies keyof typeof LOCALES,
  LOCALES,
  PATHS: {
    APP: import.meta.env.DEV ? "http://localhost:3001" : "/app",
    CODE: "https://github.com/timelet/timelet",
    DOCS: "/docs",
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
  CONTENT_PATH: (locale: keyof typeof CONFIGURATION.LOCALES, content: FlattenValues<typeof CONFIGURATION.CONTENT>) => {
    return `${CONFIGURATION.PATHS.CONTENT}/${locale}/${content}`;
  },
} as const;
