/* eslint-disable @typescript-eslint/no-var-requires */
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { build, mergeConfig, UserConfig } from "vite";
import { execSync } from "child_process";

import path from "path";

const configs: UserConfig[] = [
  {
    build: {
      lib: {
        entry: path.resolve(__dirname, "./player/MfunsPlayer.ts"),
        fileName: (format) => `mfuns-player.${format}.js`,
        name: "MfunsPlayer",
      },
      sourcemap: true,
    },
  },
  {
    build: {
      lib: {
        entry: path.resolve(__dirname, "./player/VideoPagePlayer.ts"),
        fileName: (format) => `video-page-player.${format}.js`,
        name: "MfunsPlayer",
      },
      sourcemap: true,
    },
  },
];

async function buildPlayers() {
  // 查找plugin文件夹内所有含打包配置的文件

  for await (const config of configs) {
    console.log();
    await build(
      mergeConfig(
        {
          configFile: false,
          build: {
            emptyOutDir: false,
          },
          plugins: [cssInjectedByJsPlugin()],
          resolve: {
            alias: {
              "@": path.resolve(__dirname, "src/js"),
              "@lib": path.resolve(__dirname, "src/lib"),
              "@css": path.resolve(__dirname, "src/css"),
              "@icon": path.resolve(__dirname, "./src/icon"),
            },
          },
          define: {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            MFUNSPLAYER_VERSION: JSON.stringify(require("./package.json").version),
            GIT_HASH: JSON.stringify(
              execSync("git rev-parse HEAD").toString().trim().substring(0, 7)
            ),
          },
        },
        config
      )
    ).catch((err) => console.error(err));
  }
  console.log("OK");
}

buildPlayers();
