import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#big-list-of-options
      input: {
        index: resolve(__dirname, "index.html"),
        goAgain: resolve(__dirname, "go-again.html"),
      },
    },
    minify: "terser",
  },
});
