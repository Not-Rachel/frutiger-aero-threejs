import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/threejs": {
        target: "http://localhost:5175/threejs/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/threejs/, ""),
        followRedirects: true,
      },
      "/scavenger": {
        target: "http://localhost:5174/scavenger",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/scavenger/, ""),
        followRedirects: true,
      },
    },
  },
});
