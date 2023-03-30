// vite.config.ts
import react from "file:///workspaces/timelet/node_modules/@vitejs/plugin-react/dist/index.mjs";
import ssr from "file:///workspaces/timelet/node_modules/vite-plugin-ssr/dist/cjs/node/plugin/index.js";
var config = {
  server: {
    port: 3002
  },
  plugins: [react({ jsxImportSource: "@emotion/react" }), ssr({ prerender: true })]
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvd29ya3NwYWNlcy90aW1lbGV0L2FwcHMvd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvd29ya3NwYWNlcy90aW1lbGV0L2FwcHMvd2ViL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy93b3Jrc3BhY2VzL3RpbWVsZXQvYXBwcy93ZWIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgc3NyIGZyb20gXCJ2aXRlLXBsdWdpbi1zc3IvcGx1Z2luXCI7XG5pbXBvcnQgeyBVc2VyQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcblxuY29uc3QgY29uZmlnOiBVc2VyQ29uZmlnID0ge1xuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAzMDAyLFxuICB9LFxuICBwbHVnaW5zOiBbcmVhY3QoeyBqc3hJbXBvcnRTb3VyY2U6IFwiQGVtb3Rpb24vcmVhY3RcIiB9KSwgc3NyKHsgcHJlcmVuZGVyOiB0cnVlIH0pXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1EsT0FBTyxXQUFXO0FBQ3hSLE9BQU8sU0FBUztBQUdoQixJQUFNLFNBQXFCO0FBQUEsRUFDekIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLGlCQUFpQixDQUFDLEdBQUcsSUFBSSxFQUFFLFdBQVcsS0FBSyxDQUFDLENBQUM7QUFDbEY7QUFFQSxJQUFPLHNCQUFROyIsCiAgIm5hbWVzIjogW10KfQo=
