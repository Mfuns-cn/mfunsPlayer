const path = require('path');
const baseConfig = {
    mode: 'production',
    entry: {
        mfunsPlayer: './src/js/index.js',
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
};
const esConfig = Object.assign({}, baseConfig, {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.es.js',
        library: '[name]',
        libraryTarget: 'this',
        libraryExport: 'default',
        publicPath: '/',
    },
});
const umdConfig = Object.assign({}, baseConfig, {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.umd.js',
        library: '[name]',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        publicPath: '/',
    },
});

module.exports = [esConfig, umdConfig];
