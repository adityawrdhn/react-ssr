import styled from 'styled-components'
export const TitleWrapper = styled.h1`
    font-weight: 900;
`
export const ListWrapper = styled.ul`
    list-style: none;
`
export const ItemWrapper = styled.li`
    background: white;
    padding: 16px 16px;
    border-bottom: 1px solid blue;
    &:last-child {
        border-bottom: 0px;
    }
`
