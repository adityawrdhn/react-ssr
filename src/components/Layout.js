import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from '../routes'
import Header from './Header'
import { GlobalStyle, ContentWrapper, ScrollWrapper } from 'Global.styled'
import Helmet from 'react-helmet'
class Layout extends React.Component {
    constructor() {
        super()
        this.state = {
            title: 'Welcome to React SSR!',
        }
    }

    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>React SSR</title>
                </Helmet>
                <GlobalStyle />
                <ContentWrapper>
                    <ScrollWrapper>
                        <div className="scroll__wrapper">
                            <h1>{this.state.title}</h1>
                            <Header />
                            <Switch>
                                {routes.map((route) => (
                                    <Route key={route.path} {...route} />
                                ))}
                            </Switch>
                        </div>
                    </ScrollWrapper>
                </ContentWrapper>
            </Fragment>
        )
    }
}

export default Layout
