/* eslint-disable @typescript-eslint/no-var-requires */
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { build, mergeConfig, UserConfig } from "vite";
import { execSync } from "child_process";

import path from "path";

import fs from "fs";

fs.readdir(path.resolve("./player"), (err, files) => {
  if (err) {
    console.error(err, "无法正确读取文件夹");
  } else {
    const configs: UserConfig[] = files.map((fileName) => {
      const name = fileName.substring(0, fileName.lastIndexOf("."));
      return {
        build: {
          lib: {
            entry: path.resolve(__dirname, `./player/${fileName}`),
            fileName: (format) => `${name}.${format}.js`,
            name: "MfunsPlayer",
          },
          sourcemap: true,
        },
      };
    });
    buildPlayers(configs);
  }
});

async function buildPlayers(configs: UserConfig[]) {
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
          plugins: [cssInjectedByJsPlugin({ topExecutionPriority: false })],
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
            __GIT_HASH__: JSON.stringify(
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
