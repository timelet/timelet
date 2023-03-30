import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA as pwa } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    react({ jsxImportSource: "@emotion/react" }),
    pwa({
      manifest: {
        name: "Timelet",
        short_name: "Timelet",
        description: "Distributed collaborative offline-first time tracking app.",
        theme_color: "#e6e6e6",
        background_color: "#e6e6e6",
        display: "standalone",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
