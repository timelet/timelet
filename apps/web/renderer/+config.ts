import type { Config } from "vike/types";

export default {
  passToClient: ["pageProps", "headProps", "locale", "availableLocales", "kind"],
  clientRouting: true,
  hydrationCanBeAborted: true,
} satisfies Config;
