import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#big-list-of-options
      input: {
        main: resolve(__dirname, "index.html"),
        nested: resolve(__dirname, "hc/index.html"),
      },
    },
    minify: "terser",
  },
});
