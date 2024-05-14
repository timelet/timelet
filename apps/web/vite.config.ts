import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import mdx from "@mdx-js/rollup";
import { UserConfig } from "vite";
import { mdxOptions } from "./mdx.config";
import { watchContent } from "./plugins/watchContent";

const config: UserConfig = {
  server: {
    port: 3002,
  },
  plugins: [react(), vike({ prerender: true, trailingSlash: true }), mdx(mdxOptions), watchContent()],
};

export default config;
