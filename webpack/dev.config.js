const path = require('path');
const webpack = require('webpack');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const config = {
    mode: 'development',

    entry: {
        mfunsPlayer: './src/js/index.js',
    },
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: '[name].min.umd.js',
        library: '[name]',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        publicPath: '/',
    },
    performance: { hints: false },
    devtool: 'source-map',
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.scss', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'template-string-optimize-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(scss|sass)$/i,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'sass-loader', // compiles Scss to CSS
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 89192,
                            name: 'img/[name].[hash:8].[ext]',
                        },
                    },
                ],
            },

            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
            {
                test: /\.art$/,
                loader: 'art-template-loader',
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                loader: 'url-loader',
            },
        ],
    },
    devServer: {
        compress: true,
        static: path.resolve(__dirname, '..'),
        open: true,
        host: HOST,
        port: PORT,
        historyApiFallback: {
            disableDotRule: true,
        },
    },

    plugins: [
        new webpack.DefinePlugin({
            MFUNSPLAYER_VERSION: `"${require('../package.json').version}"`,
            GIT_HASH: JSON.stringify(gitRevisionPlugin.version()),
        }),
    ],
};

module.exports = config;
