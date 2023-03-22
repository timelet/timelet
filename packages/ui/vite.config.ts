import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import packageJson from "./package.json";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: packageJson.name,
      formats: ["es", "umd"],
      fileName: (format) => `timelet-ui.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  plugins: [react({ jsxImportSource: "@emotion/react" }), svgr({ svgrOptions: { ref: true } })],
});
