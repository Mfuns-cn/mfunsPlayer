/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path")

/** 播放器插件打包配置 */
module.exports = {
  build: {
    lib: {
      entry: path.resolve(__dirname, "./index.ts"),
      fileName: (format) => `advanced-danmaku.${format}.js`,
      name: "advancedDanmaku",
    },
    sourcemap: true,
  },
}
