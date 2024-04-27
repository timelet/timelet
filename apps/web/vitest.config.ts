import { defineConfig } from "vitest/config";

export default defineConfig({
  server: {
    hmr: {
      protocol: "ws",
      host: "localhost",
    },
  },
});
