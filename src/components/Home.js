import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { initializeSession, fetchData } from '../store'
import { TitleWrapper, ListWrapper, ItemWrapper } from './Home.Styled'

class Home extends React.Component {
    static defaultProps = { bar: 'indah' }
    componentDidMount() {
        this.props.fetchData(2000)
    }

    render() {
        const { circuits } = this.props
        return (
            <Fragment>
                <TitleWrapper>F1 2000 Season Calendar {circuits.length}</TitleWrapper>
                <ListWrapper>
                    {circuits.map(({ circuitId, circuitName, Location }) => (
                        <ItemWrapper key={circuitId}>
                            {circuitName} - {Location.locality}, {Location.country}
                        </ItemWrapper>
                    ))}
                </ListWrapper>
            </Fragment>
        )
    }
}
// const newFetchData = () => {
//     return fetchData(2018)
// }
Home.getInitialProps = () => fetchData(2000)
const mapStateToProps = ({ circuits, ...props }) => ({
    circuits,
    ...props,
})

const mapDispatchToProps = {
    initializeSession,
    fetchData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
