import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "wxt"

export default defineConfig({
  srcDir: "src",
  manifest: {
    name: "Text2QR",
    version: "0.1.0",
    permissions: ["contextMenus", "activeTab"],
    icons: {
      "16": "favicon16.png",
      "32": "favicon32.png",
      "48": "favicon48.png",
      "128": "favicon128.png",
    },
  },
  outDir: "dist",
  vite: () => ({
    plugins: [react(), tailwindcss()],
  }),
})
