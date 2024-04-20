import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";
import packageJson from "./package.json";
import libAssetsPlugin from "@laynezh/vite-plugin-lib-assets";

export default defineConfig({
  build: {
    ssr: true,
    ssrEmitAssets: true,
    lib: {
      entry: "src/index.ts",
      name: packageJson.name,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          "@mantine/hooks": "mantineHooks",
          "@mantine/core": "mantineCore",
          "@tabler/icons-react": "tablerIconsReact",
        },
      },
    },
  },
  plugins: [
    libAssetsPlugin({ limit: 1024 * 8 }),
    dts({
      entryRoot: "src",
    }),
    react(),
    svgr({ svgrOptions: { ref: true }, include: "**/*.svg?react" }),
  ],
});
