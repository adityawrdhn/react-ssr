import React from 'react'
import './about.scss'
import testpng from '../assets/test.png'
import testpngimg from '../assets/img/testimg.png'
import testsvg from '../assets/icon-tw.svg'
const About = () => (
    <div className="wrapper about">
        <h2>This is the about page</h2>
        <img src={testsvg} alt="svg" />
        <img src={testpngimg} alt="png" />
        <img src={testpng} alt="png" />
    </div>
)
export default About
