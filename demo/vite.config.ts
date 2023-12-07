import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import versionUpdater from "../src";
export default defineConfig({
  plugins: [
    versionUpdater({
      name: "version-name",
      from: "package",
      timeCell: 1000 * 60 * 60,
    }),
  ],
  build: {
    outDir: "out",
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
      },
    }
  }
});
