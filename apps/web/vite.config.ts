import react from "@vitejs/plugin-react";
import ssr from "vite-plugin-ssr/plugin";
import { UserConfig } from "vite";
import watchAndRun from 'vite-plugin-watch-and-run'
import path from 'path';
import { featuresSchema } from './data/features';
import { writeFile } from 'fs/promises';

function generateSchemaFiles() {
  writeFile("./public/features.schema.json", JSON.stringify(featuresSchema));
}

const config: UserConfig = {
  server: {
    port: 3002,
  },
  plugins: [
    react({ jsxImportSource: "@emotion/react" }),
    ssr({ prerender: true }),
    watchAndRun([{ watch: path.resolve('data/**/*.ts'), watchKind: ['add', 'change', 'unlink', 'ready'], run: generateSchemaFiles }])
  ],
};

generateSchemaFiles()

export default config;
