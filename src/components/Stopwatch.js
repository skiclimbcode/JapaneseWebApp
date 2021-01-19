import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

function Stopwatch(props) {
    const [stopwatch, setStopwatch] = useState('00:00:00')

    useEffect(() => {
        //
        return () => {
            clearInterval()
        }
    }, [])
    
    const prepend0 = (time) => {
        return (time < 10 ? '0' + time : time)
    }

    let now = 0
    const tick = () => {
        now++
        let remain = now
        const hours = Math.floor(remain / 3600)
        remain -= hours * 3600
        const mins = Math.floor(remain / 60)
        remain -= mins * 60
        const secs = remain
        setStopwatch(prepend0(hours) + ':' + prepend0(mins) + ':' + prepend0(secs))
    }

    const start = () => {
        console.log('Timer started')
        const tmp = setInterval(tick, 1000)
        console.log('tmp:', typeof tmp)
    }

    return (
    <div>
        <Button onClick={start}>Start Timer</Button>
        <div>{stopwatch}</div>
    </div>
    )
}

export default Stopwatch;
