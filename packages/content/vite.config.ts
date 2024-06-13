import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import packageJson from "./package.json";

export default defineConfig({
  build: {
    ssr: true,
    ssrEmitAssets: true,
    lib: {
      entry: {
        api: "src/api.ts",
        cli: "src/cli.ts",
      },
      name: packageJson.name,
    },
    rollupOptions: {
      external: ["fast-glob", "node:path", "node:crypto", "to-vfile", "vfile-matter", "limax"],
      output: {
        globals: {
          chokidar: "chokidar",
          "fast-glob": "glob",
          "node:fs/promises": "fs",
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
