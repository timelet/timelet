import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import packageJson from "./package.json";

export default defineConfig({
  build: {
    ssr: true,
    ssrEmitAssets: true,
    lib: {
      entry: "src/index.ts",
      name: packageJson.name,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {
          "node:path": "nodePath",
        },
      },
    },
  },
  plugins: [
    dts({
      entryRoot: "src",
    }),
  ],
});
