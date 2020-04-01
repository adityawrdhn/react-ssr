import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'

const Header = ({ loggedIn }) => {
    const { t, i18n } = useTranslation(['translation'])
    return (
        <div>
            <Link to="/" className="link">
                Home
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
        </div>
    )
}
const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
})

export default connect(mapStateToProps)(Header)
