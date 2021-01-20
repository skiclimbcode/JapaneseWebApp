import React from 'react'
import Button from 'react-bootstrap/Button'

export default function Finish(props) {
    return (
    <React.Fragment>
        <div> You're done! </div>
        <div> Correct Responses: <span className="correct-color">{props.correct}</span></div>
        <div> Mistakes: <span className="mistakes-color">{props.mistakes}</span></div>
        <div> You scored {props.correct - props.mistakes} points!</div>
        <Button variant="primary" onClick={props.restart}>Go Again</Button>
    </React.Fragment>
    )
}
