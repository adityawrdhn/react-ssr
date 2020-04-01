import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import i18n from './i18nClient'
import { I18nextProvider } from 'react-i18next'
import Layout from './components/Layout'
import createStore from './store'
import './App.css'
i18n.changeLanguage(window.i18n.locale);
i18n.addResourceBundle(window.i18n.locale, 'translation', window.i18n.resources, true);

const store = createStore(window.REDUX_DATA)
const html = (
    <ReduxProvider store={store}>
        <I18nextProvider i18n={i18n}>
            <Router>
                <Layout />
            </Router>
        </I18nextProvider>
    </ReduxProvider>
)

const app = document.getElementById('root')
ReactDOM.hydrate(html, app)
