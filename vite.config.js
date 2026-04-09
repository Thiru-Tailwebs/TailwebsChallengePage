import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { apiMiddleware } from "./server/api.js";

export default defineConfig({
  plugins: [react(), tailwindcss(), apiMiddleware()],
  build: {
    target: "es2020",
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },
  server: {
    open: true,
  },
});
