const webpack = require('webpack')
const nodemon = require('nodemon')
const rimraf = require('rimraf')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express = require('express')
const paths = require('../config/paths')
const clientConfig = require('../config/client.config')
const serverConfig = require('../config/server.config')
const { logMessage, compilerPromise } = require('./utils')

const app = express()
app.disable('x-powered-by');
const WEBPACK_PORT = !isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : 3030

const start = async () => {
    rimraf.sync(paths.build)

    clientConfig.entry.bundle = [
        `webpack-hot-middleware/client?path=http://localhost:${WEBPACK_PORT}/__webpack_hmr`,
        ...clientConfig.entry.bundle,
    ]

    clientConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json'
    clientConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js'

    const multiCompiler = webpack([clientConfig, serverConfig])

    const clientCompiler = multiCompiler.compilers[0]
    const serverCompiler = multiCompiler.compilers[1]

    const clientPromise = compilerPromise(clientCompiler)
    const serverPromise = compilerPromise(serverCompiler)

    const watchOptions = {
        // poll: true,
        ignored: /node_modules/,
        stats: clientConfig.stats,
    }

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        return next()
    })

    app.use(
        webpackDevMiddleware(clientCompiler, {
            publicPath: clientConfig.output.publicPath,
            stats: clientConfig.stats,
            watchOptions,
        }),
    )

    app.use(webpackHotMiddleware(clientCompiler))

    app.use(express.static(paths.build))

    app.listen(WEBPACK_PORT)

    serverCompiler.watch(watchOptions, (error, stats) => {
        if (!error && !stats.hasErrors()) {
            console.log(stats.toString(serverConfig.stats))
            return
        }

        if (error) {
            logMessage(error, 'error')
        }

        if (stats.hasErrors()) {
            const info = stats.toJson()
            const errors = info.errors[0].split('\n')
            logMessage(errors[0], 'error')
            logMessage(errors[1], 'error')
            logMessage(errors[2], 'error')
        }
    })

    // wait until client and server is compiled
    try {
        await serverPromise
        await clientPromise
    } catch (error) {
        logMessage(error, 'error')
    }

    const script = nodemon({
        script: `${paths.build}/server.js`,
        ignore: ['src', 'scripts', 'config', './*.*', 'dist/client'],
    })

    script.on('restart', () => {
        logMessage('Server side app has been restarted.', 'warning')
    })

    script.on('quit', () => {
        console.log('Process ended')
        process.exit()
    })

    script.on('error', () => {
        logMessage('An error occured. Exiting', 'error')
        process.exit(1)
    })
}

start()
