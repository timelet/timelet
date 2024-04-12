import type { Config } from "vike/types";

export default {
  passToClient: ["pageProps", "headProps", "locale"],
  clientRouting: true,
  hydrationCanBeAborted: true,
} satisfies Config;
