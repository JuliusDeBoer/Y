// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  output: "server",

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    imageService: "cloudflare",
  }),

  vite: {
    plugins: [tailwindcss()],
    resolve: import.meta.env.DEV
      ? {}
      : {
          alias: {
            "react-dom/server": "react-dom/server.edge",
          },
        },
    ssr: {
      external: [
        "assert",
        "buffer",
        "crypto",
        "dns",
        "net",
        "path",
        "process",
        "streams",
        "test",
        "timers",
        "url",
        "util",
        "zlib",
	"node:fs",
      ],
    },
  },

  integrations: [react(), db()],
});
