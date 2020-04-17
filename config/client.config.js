const dev = process.env.NODE_ENV !== 'production'
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const paths = require('./paths')

const plugins = [
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: dev ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: dev ? '[id].css' : '[id].[contenthash].css',
    }),
    new webpack.DefinePlugin({
        __SERVER__: 'false',
        __CLIENT__: 'true',
    }),
    new ManifestPlugin({ fileName: 'manifest.json' }),
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
    name: 'client',
    target: 'web',
    mode: dev ? 'development' : 'production',
    devtool: dev ? 'none' : 'source-map',
    entry: {
        bundle: ['@babel/polyfill', path.resolve(__dirname, '../src/client/index.js')],
    },
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
                    'css-hot-loader',
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
                        loader: 'style-loader',
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
    optimization: {
        namedModules: true,
        noEmitOnErrors: true,
        // concatenateModules: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
    stats: {
        cached: false,
        cachedAssets: false,
        chunks: false,
        chunkModules: false,
        colors: true,
        hash: false,
        modules: false,
        reasons: false,
        timings: true,
        version: false,
    },
}
