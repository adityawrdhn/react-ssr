import express from 'express'
import path from 'path'

import React from 'react'
import serialize from 'serialize-javascript'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import Helmet from 'react-helmet'
import routes from './routes'
import Layout from './components/Layout'
import createStore, { initializeSession } from './store'
import i18n from './i18nServer'
import { I18nextProvider } from 'react-i18next'
import i18nMiddleware from 'i18next-express-middleware'

const app = express()
app.use(i18nMiddleware.handle(i18n))
app.use(express.static(path.resolve(__dirname, '../dist')))

app.get('/*', (req, res) => {
    console.log(req)
    const context = {}
    const store = createStore()
    const locale = req.language
    const resources = i18n.getResourceBundle(locale, 'translation')
    const i18nClient = { locale, resources }

    const i18nServer = i18n.cloneInstance()
    i18nServer.changeLanguage(locale)
    store.dispatch(initializeSession())

    const dataRequirements = routes
        .filter(route => matchPath(req.url, route)) // filter matching paths
        .map(route => route.component) // map to components
        .filter(comp => comp.serverFetch) // check if components have data requirement
        .map(comp => store.dispatch(comp.serverFetch())) // dispatch data requirement

    Promise.all(dataRequirements).then(() => {
        const html = (
            <ReduxProvider store={store}>
                <I18nextProvider i18n={i18nServer}>
                    <StaticRouter context={context} location={req.url}>
                        <Layout />
                    </StaticRouter>
                </I18nextProvider>
            </ReduxProvider>
        )
        const reactDom = renderToString(html)
        const reduxState = store.getState()
        const helmetData = Helmet.renderStatic()

        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(htmlTemplate(reactDom, reduxState, helmetData, i18nClient, req, res))
    })
})
console.log('Run on Environment: ', process.env.NODE_ENV)
const port = process.env.PORT || 3030
app.listen(port, () => console.log(`App listen on port: ${port}`))

const htmlTemplate = (reactDom, reduxState, helmetData, i18n, req, res) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            ${helmetData.title.toString()}
            ${helmetData.meta.toString()}
            <title>React SSR</title>
            <link rel="stylesheet" type="text/css" href="./app.style.css" />
        </head>
        
        <body>
            <div id="root">${reactDom}</div>
            <script>
                window.REDUX_DATA = ${serialize(reduxState, { isJSON: true })}
                window.i18n = ${serialize(i18n, { isJSON: true })}
            </script>
            <script src="./app.chunk.js"></script>
        </body>
        </html>
    `
}
