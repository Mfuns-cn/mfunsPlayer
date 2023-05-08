const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();
const baseConfig = require("./webpack.common.js")

const esConfig = merge(baseConfig, {
    mode: 'production',
    experiments: {
        outputModule: true,
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].min.es.js',
        libraryTarget: 'module',
        libraryExport: 'default',
        globalObject: 'this',
        umdNamedDefine: true,
        publicPath: '/',
    },
});
const umdConfig = merge(baseConfig, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].min.umd.js',
        library: 'MfunsPlayer',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        publicPath: '/',
    },
});

module.exports = [esConfig, umdConfig];
