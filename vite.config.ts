import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { defineConfig } from "vite";
import path from "path";
import { execSync } from "child_process";

/** 播放器本体打包配置 */
export default defineConfig({
  build: {
    lib: {
      entry: ["src/js/index.ts"],
      fileName: (format) => `player.${format}.js`,
      name: "Player",
    },
    sourcemap: true,
    emptyOutDir: false,
  },
  plugins: [cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/core"),
      "@core": path.resolve(__dirname, "src/core"),
      "@plugin": path.resolve(__dirname, "src/plugin"),
      "@css": path.resolve(__dirname, "src/css"),
      "@icon": path.resolve(__dirname, "./src/icon"),
    },
  },
  define: {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    __MFUNSPLAYER_VERSION__: JSON.stringify(require("./package.json").version),
    __GIT_HASH__: JSON.stringify(execSync("git rev-parse HEAD").toString().trim().substring(0, 7)),
  },
});
