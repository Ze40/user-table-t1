import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  base: "user-table-t1",
  server: {
    allowedHosts: ["localhost"],
    port: 5173,
    proxy: {
      "/api": {
        changeOrigin: true,
        secure: false,
        target: "http://localhost:4000",
      },
    },
    strictPort: true,
  },
});
