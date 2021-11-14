const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    mfunsPlayer: "./src/js/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  devtool: "source-map",
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".scss"],
  },
  module: {
    rules: [
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
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.art$/,
        loader: "art-template-loader",
      },
    ],
  },
};
