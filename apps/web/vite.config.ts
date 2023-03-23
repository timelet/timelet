import react from "@vitejs/plugin-react";
import ssr from "vite-plugin-ssr/plugin";
import { UserConfig } from "vite";

const config: UserConfig = {
  plugins: [react({ jsxImportSource: "@emotion/react" }), ssr({ prerender: true })],
};

export default config;
