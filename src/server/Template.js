import React from 'react'
import serialize from 'serialize-javascript'

const Template = ({ children, head, scripts, css, state, i18nState, style }) => {
    return (
        <html lang="">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {head.base.toComponent()}
                {head.title.toComponent()}
                {head.meta.toComponent()}
                {head.link.toComponent()}
                {head.script.toComponent()}
                {css.map((href) => {
                    return href && <link key={href} rel="stylesheet" href={'/' + href} />
                })}
                {style}
            </head>
            <body>
                <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.__PRELOADED_STATE__ = ${serialize(state, {
                            isJSON: true,
                        })}`,
                    }}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.__I18N_STATE__ = ${serialize(i18nState)}`,
                    }}
                />
                {scripts.map((src) => {
                    return src && <script key={src} src={'/' + src} />
                })}
            </body>
        </html>
    )
}

export default Template
