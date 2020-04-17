import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { createBrowserHistory } from 'history'
import LanguageProvider from '../LanguageProvider'
import i18nConfig from '../i18nConfig'
import Layout from 'components/Layout'
import createStore from '../store'
import '../App.css'
import { ThemeProvider } from 'styled-components'
import { theme } from 'theme'
if (window.__I18N_STATE__) {
    i18nConfig.changeLanguage(window.__I18N_STATE__)
}
const store = window.__PRELOADED_STATE__ ? createStore(window.__PRELOADED_STATE__) : createStore()
const html = (
    <ReduxProvider store={store}>
        <LanguageProvider I18n={i18nConfig}>
            <Router>
                <ThemeProvider theme={theme}>
                    <Layout />
                </ThemeProvider>
            </Router>
        </LanguageProvider>
    </ReduxProvider>
)

const app = document.getElementById('root')
ReactDOM.hydrate(html, app)

const browserHistory = window.browserHistory || createBrowserHistory()
if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        module.hot.accept()
    }

    if (!window.store || !window.browserHistory) {
        window.browserHistory = browserHistory
        window.store = store
    }
}
