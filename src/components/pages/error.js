import React from 'react'
import "./error.css"
import Img from '../../assets/404.svg'

function error() {
    return (
        <div className="error">
         <img src={Img}></img>
        </div>
    )
}

export default error
