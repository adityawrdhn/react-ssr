import express from 'express'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import Helmet from 'react-helmet'
import i18nMiddleware from 'i18next-express-middleware'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import manifestHelpers from 'express-manifest-helpers'
import routes from '../routes'
import createStore, { initializeSession, setLang } from '../store'
import LanguageProvider from '../LanguageProvider'
import paths from '../../config/paths'
import Template from './Template'
import i18nConfig from '../i18nConfig'
import Layout from 'components/Layout'
import { ThemeProvider, ServerStyleSheet } from 'styled-components'
import { theme } from 'theme'

const app = express()
app.disable('x-powered-by')
app.use(i18nMiddleware.handle(i18nConfig))
app.use(cookieParser())
app.use(express.static(paths.build))
app.use(cors())
app.use(bodyParser.json())
app.use(
    manifestHelpers({
        manifestPath: `${paths.build}/manifest.json`,
    }),
)

app.get('/*', (req, res) => {
    const context = {}
    const store = createStore()
    if (req.cookies && req.cookies.language) {
        req.i18n.changeLanguage(req.cookies.language)
        store.dispatch(setLang(req.cookies.language))
    }
    store.dispatch(initializeSession())

    const promises = routes.reduce((promise, route) => {
        if (matchPath(req.url, route) && route.component && route.component.getInitialProps) {
            promise.push(store.dispatch(route.component.getInitialProps(req)))
        }
        return promise
    }, [])

    Promise.all(promises).then(() => {
        const html = (
            <ReduxProvider store={store}>
                <LanguageProvider i18n={req.i18n}>
                    <StaticRouter context={context} location={req.url}>
                        <ThemeProvider theme={theme}>
                            <Layout />
                        </ThemeProvider>
                    </StaticRouter>
                </LanguageProvider>
            </ReduxProvider>
        )
        const styledSheets = new ServerStyleSheet()
        const reactDom = renderToString(styledSheets.collectStyles(html))
        const style = styledSheets.getStyleElement()
        const preloadedState = store.getState()
        const helmetData = Helmet.renderStatic()
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(
            '<!DOCTYPE html>' +
                renderToString(
                    <Template
                        head={helmetData}
                        state={preloadedState}
                        i18nState={req.i18n.language}
                        css={[
                            res.locals.assetPath('bundle.css'),
                            res.locals.assetPath('vendor.css'),
                        ]}
                        scripts={[
                            res.locals.assetPath('bundle.js'),
                            res.locals.assetPath('vendor.js'),
                        ]}
                        style={style}
                    >
                        {reactDom}
                    </Template>,
                ),
        )
    })
})
console.log('App run on environment: ', process.env.NODE_ENV)
const port = process.env.PORT || 2222
app.listen(port, () => console.log(`App listen on port: ${port}`))
