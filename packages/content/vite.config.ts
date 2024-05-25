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
      external: ["fast-glob", "node:path", "node:crypto", "to-vfile", "vfile-matter", "limax"],
      output: {
        globals: {
          "fast-glob": "glob",
          "node:path": "nodePath",
          "node:crypto": "nodeCrypto",
          "to-vfile": "toVfile",
          "vfile-matter": "vfileMatter",
          limax: "slugify",
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
