import type { Config } from "vike/types";

export default {
  passToClient: ["pageProps", "locale"],
  clientRouting: true,
  hydrationCanBeAborted: true,
} satisfies Config;
