import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setLang } from '../store'
const Header = ({ loggedIn, setLang }) => {
    const { t } = useTranslation()
    const hanldeChangelang = (code) => {
        setLang(code)
    }
    return (
        <div>
            <Link to="/" className="link">
                {t('babih')}
            </Link>
            <Link to="/about" className="link">
                {t('nav_menu.about_us')}
            </Link>
            <Link to="/contact" className="link">
                Contact
            </Link>
            {loggedIn && (
                <Link to="/secret" className="link">
                    Secret
                </Link>
            )}
            <button onClick={() => hanldeChangelang('id')}>id</button>
            <button onClick={() => hanldeChangelang('en')}>en</button>
        </div>
    )
}
const mapStateToProps = (state) => ({
    loggedIn: state.loggedIn,
})
const mapDispatchToProps = { setLang }

export default connect(mapStateToProps, mapDispatchToProps)(Header)
