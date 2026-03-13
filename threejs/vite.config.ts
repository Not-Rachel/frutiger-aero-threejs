import { defineConfig } from "vite";

export default defineConfig({
  base: "/threejs/",
  publicDir: "public",
  build: {
    outDir: "../dist/threejs",
  },
});
