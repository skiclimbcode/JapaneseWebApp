import React from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

export default function Finish(props) {

    const roundOff = (num, places) => {
        const x = Math.pow(10,places);
        return Math.round(num * x) / x;
    }

    return (
    <React.Fragment>
        <Container>
            <Row>
                <Col xs={12}><h2>Finished!</h2></Col>
            </Row>
            <Row>
                <Col xs={12} sm={6} className="left-align">Correct:</Col>
                <Col xs={12} sm={6} className="right-align correct-color">{props.correct}</Col>
            </Row>
            <Row>
                <Col xs={12} sm={6} className="left-align">Mistakes:</Col>
                <Col xs={12} sm={6} className="right-align mistakes-color">{props.mistakes}</Col>
            </Row>
            <Row>
                <Col xs={12} sm={6} className="left-align">Score:</Col>
                <Col xs={12} sm={6} className="right-align correct-color">{props.correct - props.mistakes}</Col>
            </Row>
            <Row>
                <Col xs={12} sm={6} className="left-align">Avg Guess:</Col>
                <Col xs={12} sm={6} className="right-align correct-color">
                    {roundOff((props.guessTimes.reduce((a, b) => a + b) / props.guessTimes.length) / 1000, 2)} s    
                </Col>  
            </Row>
            <Row>
                <Col xs={12}>
                    <Button variant="primary" onClick={props.restart}>Go Again</Button>
                </Col>
            </Row>
        </Container>
    </React.Fragment>
    )
}
