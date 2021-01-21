import React from 'react'
import Button from 'react-bootstrap/Button'

export default function Finish(props) {

    const roundOff = (num, places) => {
        const x = Math.pow(10,places);
        return Math.round(num * x) / x;
    }

    return (
    <React.Fragment>
        <div> You're done! </div>
        <div> Correct Responses: <span className="correct-color">{props.correct}</span></div>
        <div> Mistakes: <span className="mistakes-color">{props.mistakes}</span></div>
        <div> You scored {props.correct - props.mistakes} points!</div>
        <div> It took you an average of {roundOff((props.guessTimes.reduce((a, b) => a + b) / props.guessTimes.length) / 1000, 2)} seconds to guess each character!</div>
        <Button variant="primary" onClick={props.restart}>Go Again</Button>
    </React.Fragment>
    )
}
