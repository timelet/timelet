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
  },
  plugins: [
    dts({
      entryRoot: "src",
    }),
  ],
});
