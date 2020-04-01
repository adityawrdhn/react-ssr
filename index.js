require('babel-register')({
    presets: ['env'],
    plugins: [
        [
            'css-modules-transform',
            {
                camelCase: true,
                extensions: ['.css', '.scss'],
            },
        ],
        'dynamic-import-node',
        [
            'file-loader',
            {
                name: '[name].[ext]',
                extensions: ['png', 'jpg', 'jpeg', 'gif', 'svg'],
                publicPath: 'assets',
                outputPath: '/dist/assets',
            },
        ],
    ],
})
require('./src/server')
