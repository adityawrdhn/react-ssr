const webpack = require('webpack')
const rimraf = require('rimraf')
const clientConfig = require('../config/client.config')
const serverConfig = require('../config/server.config')
const paths = require('../config/paths')
const { logMessage, compilerPromise } = require('./utils')
const nodemon = require('nodemon')
/**
 * static rendering has a lot of issue
 *
    const generateStaticHTML = async () => {
        const fs = require('fs');
        const puppeteer = require('puppeteer');

        const PORT = process.env.PORT ? process.env.PORT : 2222;

        const script = nodemon({
            script: `${paths.build}/server.js`,
            ignore: ['*'],
        });

        script.on('start', async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(`http://localhost:${PORT}`);
            const pageContent = await page.content();
            fs.writeFileSync(`${paths.build}/index.html`, pageContent);
            await browser.close();
            process.exit();
        });

        script.on('quit', () => {
            process.exit();
        });

        script.on('error', () => {
            process.exit(1);
        });
    };
*/
const build = async () => {
    rimraf.sync(paths.build)

    const multiCompiler = webpack([clientConfig, serverConfig])

    const clientCompiler = multiCompiler.compilers[0]
    const serverCompiler = multiCompiler.compilers[1]

    const clientPromise = compilerPromise(clientCompiler)
    const serverPromise = compilerPromise(serverCompiler)

    serverCompiler.watch({}, (error, stats) => {
        if (!error && !stats.hasErrors()) {
            console.log('SERVER =>', stats.toString(serverConfig.stats))
            return
        } else {
            console.log('ERROR', error)
        }
    })

    clientCompiler.watch({}, (error, stats) => {
        if (!error && !stats.hasErrors()) {
            console.log('CLIENT =>', stats.toString(clientConfig.stats))
            return
        } else {
            console.log('ERROR', error)
        }
    })

    try {
        await serverPromise
        await clientPromise
        // await generateStaticHTML();
        logMessage('Build Successfull!', 'success')
    } catch (error) {
        logMessage(error, 'error')
    }
    const script = nodemon({
        script: `${paths.build}/server.js`,
        ignore: ['src', 'scripts', 'config', './*.*', 'dist/client'],
    })

    script.on('start', () => {
        logMessage(`Start Server :\n yarn start or npm run start`, 'success')
        process.exit()
    })
}

build()
