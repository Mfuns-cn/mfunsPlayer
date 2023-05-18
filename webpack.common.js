const path = require("path")
const webpack = require("webpack")
const { GitRevisionPlugin } = require("git-revision-webpack-plugin")
const gitRevisionPlugin = new GitRevisionPlugin()

const baseConfig = {
  entry: {
    ["mfuns-player"]: "./src/js/index.ts",
  },
  performance: { hints: false },
  devtool: "source-map",
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".scss", ".ts"],
    alias: {
      "@css": path.resolve(__dirname, "./src/css"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@": path.resolve(__dirname, "./src/js"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(scss|sass)$/i,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "sass-loader", // compiles Scss to CSS
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 89192,
              name: "img/[name].[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        loader: "url-loader",
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      MFUNSPLAYER_VERSION: `"${require("./package.json").version}"`,
      GIT_HASH: JSON.stringify(gitRevisionPlugin.version()),
    }),
  ],
}

module.exports = baseConfig
