/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          cdnScript:
            process.env.NODE_ENV === "production"
              ? '<script src="https://unpkg.com/zxcvbn@4.4.2/dist/zxcvbn.js"></script>'
              : "",
        },
      },
    }),
  ],
  test: {
    coverage: {
      provider: "istanbul",
    },
    environment: "jsdom",
  },
  build: {
    sourcemap: process.env.NODE_ENV === "development",
    rollupOptions: {
      external: ["zxcvbn"],
      output: {
        format: "umd",
        globals: {
          zxcvbn: "zxcvbn",
        },
      },
    },
  },
});
