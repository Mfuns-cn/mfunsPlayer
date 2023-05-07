const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();
const baseConfig = require("./webpack.common.js")

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const devConfig = merge(baseConfig, {
    mode: 'development',
    devServer: {
        hot: true,
        compress: true,
        static: path.resolve(__dirname, '.'),
        open: ['./demo'],
        host: HOST,
        port: PORT,
        historyApiFallback: {
            disableDotRule: true,
        },
    },
});

module.exports = devConfig;
