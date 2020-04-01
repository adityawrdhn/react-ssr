const dev = process.env.NODE_ENV !== 'production'
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
console.log('Build Environment', dev ? 'Development' : 'Production')

const plugins = [
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: dev ? '[name].style.css' : '[name].style.css',
        chunkFilename: dev ? '[id].chunk.css' : '[id].chunk.css',
    }),
    new WriteFilePlugin(),
]

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
    mode: dev ? 'development' : 'production',
    context: path.join(__dirname, 'src'),
    devtool: dev ? 'none' : 'source-map',
    entry: {
        app: './client.js',
    },
    resolve: {
        modules: [path.resolve('./src'), 'node_modules'],
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
                            name: '[name].[ext]',
                            outputPath: url => {
                                return `assets/${url}`
                            },
                        },
                    },
                ],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].chunk.js',
    },
    plugins,
}
