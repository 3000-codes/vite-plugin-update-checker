import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';
export default defineConfig({
  plugins: [
    dts({
      exclude: ["**/demo/**/*"],
    }),
  ],
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      name: "version-updater",
      formats: ["es", "umd", "cjs"],
      fileName: (format) => format==="cjs"?"index.js":`index.${format}.js`,
    },
  },
});
