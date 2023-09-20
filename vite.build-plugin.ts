/* eslint-disable @typescript-eslint/no-var-requires */
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js"
import { build, mergeConfig, UserConfig } from "vite"
import path from "path"
import glob from "fast-glob"

async function buildPlugins() {
  // 查找plugin文件夹内所有含打包配置的文件
  const files = await glob("./plugins/**/plugin.vite.config.js")
  console.log(files)
  files.forEach((f) => {
    console.log(f)
  })
  for await (const file of files) {
    const config = require(file) as UserConfig
    console.log()
    await build(
      mergeConfig(
        {
          configFile: false,
          build: {
            rollupOptions: {
              external: ["mfuns-player", "@/player"],
              output: {
                globals: {
                  "mfuns-player": "MfunsPlayer",
                  "@/player": "MfunsPlayer",
                },
              },
            },
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
        },
        config
      )
    ).catch((err) => console.error(err))
  }
  console.log("OK")
}

buildPlugins()
