
import i18next from 'i18next'
import middleware from 'i18next-express-middleware'
import en from 'assets/locales/en.json'
import id from 'assets/locales/id.json'
i18next.use(middleware.LanguageDetector).init({
    debug: false,
    fallbackLng: 'id',
    whitelist: ['en', 'id'],
    fallbackNS: ['keys'],
    resources: {
        en: en,
        id: id,
    },
    detection: {
        order: ['cookie'],
        caches: ['cookie'],
        lookupCookie: 'language',
    },
    defaultNS: ['keys'],
    ns: ['keys'],
    parseMissingKeyHandler: (missing) => {
        if (process.env.NODE_ENV === 'development') {
            console.warn('MISSING TRANSLATION:', missing)
        }
        return missing
    },
})
export default i18next