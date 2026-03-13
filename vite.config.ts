import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"
import tailwindcss from "@tailwindcss/vite"

import type { UserConfig } from "vite"
import type { InlineConfig } from "vitest/node"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  test: {
    globals: true,
    setupFiles: ["./test/setup.ts"],
    environment: "happy-dom"
  },
} as UserConfig & {
  test: InlineConfig

})