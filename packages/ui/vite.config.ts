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
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@mantine/hooks": "mantineHooks",
          "@mantine/react": "mantineReact",
          "@mantine/core": "mantineCore",
          "@tabler/icons-react": "tablerIconsReact",
        },
      },
    },
  },
  plugins: [react(), svgr({ svgrOptions: { ref: true }, include: "**/*.svg?react" })],
});
