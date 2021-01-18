import React, { useState } from 'react';
import Timer from 'tiny-timer';

function Stopwatch(startStop, paused, resumed) {
    const [stopwatch, setStopwatch] = useState('')
    const timer = new Timer({interval: 1000, stopwatch: true})
    timer.on('tick', (ms) => {
        setStopwatch(ms)
    })
    if (startStop) {
        if (resumed) {
            timer.resume()
        } else {
            timer.start(999999999999)
        }
    } else if (paused) {
        timer.pause()
    } else {
        timer.stop()
    }

    const convertMsToHours = (ms) => {
        return ms
    }

    return <div>{stopwatch}</div>
}

export default Stopwatch;
