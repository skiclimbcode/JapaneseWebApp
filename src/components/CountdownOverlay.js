import './CountdownOverlay.css'
import React, { useEffect } from 'react'
import Countdown from 'react-countdown'

export default function CountdownOverlay(props) {
    
    const countdownRender = ({hours, minutes, seconds, completed }) => {
        if (!completed) {
            return <h1 id="text">{seconds}</h1>
        } else {
            props.removeCountdown()
            return null
        }
      }

    return (
    <div id="overlay">
        <Countdown date={Date.now() + 3000} renderer={countdownRender}/>
    </div>
    )
}