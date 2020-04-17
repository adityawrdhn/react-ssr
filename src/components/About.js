import React, { useEffect } from 'react'
import './about.scss'
import testpng from 'assets/test.png'
import testpngimg from 'assets/img/testimg.png'
import testsvg from 'assets/icon-tw.svg'
import { fetchData } from '../store'
import { connect } from 'react-redux'
const About = ({ fetchData, circuits }) => {
    useEffect(() => {
        fetchData(2018)
    }, [])
    return (
        <div className="wrapper about">
            <h2>This is the about page</h2>
            <img src={testsvg} alt="svg" />
            <img src={testpngimg} alt="png" />
            <img src={testpng} alt="png" />
            <h2>F1 2018 Season Calendar {circuits.length}</h2>
            <ul>
                {circuits.map(({ circuitId, circuitName, Location }) => (
                    <li key={circuitId}>
                        {circuitName} - {Location.locality}, {Location.country}
                    </li>
                ))}
            </ul>
        </div>
    )
}

About.getInitialProps = () => {
    return fetchData(2018)
}

const mapStateToProps = ({ circuits }) => ({
    circuits,
})
const mapDispatchToProps = {
    fetchData,
}
export default connect(mapStateToProps, mapDispatchToProps)(About)
