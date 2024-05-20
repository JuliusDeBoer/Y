import { defineConfig } from "vite";
import { preact } from "@preact/preset-vite";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    TanStackRouterVite({
      enableRouteGeneration: true,
      experimental: {
        enableCodeSplitting: true,
      },
    }),
  ],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
});
