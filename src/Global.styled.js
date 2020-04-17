import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Rubik', sans-serif;
        background: #000;
        &::-webkit-scrollbar {
            display: none;
        }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: 'Raleway', sans-serif;
        margin-top: 0;
    }

    section {
        position: relative;
    }
    .is-mobile {
        display: none;
    }
    .is-desktop {
        display: block;
    }
    @media ${(props) => props.theme.devices.sm} {
        .is-mobile {
            display: block;
        }
        .is-desktop {
            display: none;
        }
    }
    @media ${(props) => props.theme.devices.sm} {
        .scrollspy__menu {
            list-style: none;
            flex-grow: 1;
            li {
                padding: 30px 0;
                border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};
                &:last-child {
                    border-bottom: 0px;
                }
                a {
                    font-size: 20px;
                    font-weight: 500;
                    color: #343d48;
                    position: relative;
                    font-family: 'Raleway', sans-serif;
                    transition: 0.15s ease-in-out;
                    text-decoration: none;
                    @media (max-width: 767px) {
                        font-size: 18px;
                    }
                    &:hover {
                        &:before {
                            transform: scaleX(1);
                            transform-origin: left center 0;
                            transition: transform 0.35s cubic-bezier(0.43, 0.49, 0.51, 0.68);
                        }
                    }
                    &:before {
                        content: '';
                        position: absolute;
                        width: calc(100% - 8px);
                        height: 11px;
                        background: #c2c7fb;
                        bottom: 2px;
                        left: -4px;
                        z-index: -1;
                        transform: scaleX(0);
                        transform-origin: right center 0;
                        transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1) 0s;
                    }
                }
                hr {
                    display: none;
                }
                &.is-active {
                    a {
                        &:before {
                            transform: scaleX(1);
                            transform-origin: left center 0;
                            transition: transform 0.35s cubic-bezier(0.43, 0.49, 0.51, 0.68);
                        }
                    }
                }
            }
        }
    }
`
export const ContentWrapper = styled.div`
    &::before {
        position: fixed;
        overflow: hidden;
        top: 0;
        right: 0;
        left: 0;
        background: pink;
        content: '';
        display: block;
        height: 100vh;
        cursor: move;
        cursor: grab;
        cursor: -webkit-grab;
    }
`

export const ScrollWrapper = styled.div`
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .scroll__wrapper {
        position: relative;
    }
`
