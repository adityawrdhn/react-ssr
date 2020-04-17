const dev = process.env.NODE_ENV !== 'production'
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const paths = require('./paths')

const plugins = [
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: dev ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: dev ? '[id].css' : '[id].[contenthash].css',
    }),
    new webpack.DefinePlugin({
        __SERVER__: 'true',
        __CLIENT__: 'false',
    }),
]
if (dev) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
    plugins.push(new WriteFilePlugin())
}

if (!dev) {
    plugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'webpack-report.html',
            openAnalyzer: false,
        }),
    )
}

module.exports = {
    name: 'server',
    target: 'node',
    mode: dev ? 'development' : 'production',
    entry: {
        server: ['@babel/polyfill', path.resolve(__dirname, '../src/server/index.js')],
    },
    externals: [
        nodeExternals({
            whitelist: /\.(sa|sc|c)ss$/,
        }),
    ],
    resolve: {
        extensions: ['.js', '.mjs', '.json', '.jsx', '.css'],
        modules: paths.resolveModules,
        alias: {
            components: path.join(paths.src, 'components'),
            assets: path.join(paths.src, 'assets'),
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader',
                        options: { injectType: 'singletonStyleTag' },
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer()],
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                include: /node_modules/,
                use: [
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer()],
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpe?g|ico|txt|gif|png|svg|woff|ttf|wav|mp3)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                            outputPath: (url) => {
                                return `/media/${url}`
                            },
                        },
                    },
                ],
            },
        ],
    },
    output: {
        path: paths.build,
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash:8].chunk.js',
    },
    plugins,
    stats: {
        colors: true,
    },
}
