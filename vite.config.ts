import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   watch: {
  //     ignored: ["**/scavenger/**"], // don't watch anything inside scavenger
  //   },
  //   fs: {
  //     allow: [".", "scavenger/dist"],
  //   },
  // },
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        scavenger: "./public/scavenger/index.html", // serve scavenger as its own entry
      },
    },
  },
});
