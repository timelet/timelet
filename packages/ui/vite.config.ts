import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import packageJson from "./package.json";

export default defineConfig({
  build: {
    ssr: true,
    target: "esnext",
    lib: {
      entry: "src/index.ts",
      name: packageJson.name,
      fileName: "timelet.cjs.js",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@emotion/react/jsx-runtime": "reactJSXRuntime",
          "@mantine/hooks": "mantineHooks",
          "@mantine/react": "mantineReact",
          "@mantine/core": "mantineCore",
          "@emotion/react": "emotionReact",
        },
      },
    },
  },
  plugins: [react({ jsxImportSource: "@emotion/react" }), svgr({ svgrOptions: { ref: true } })],
});
