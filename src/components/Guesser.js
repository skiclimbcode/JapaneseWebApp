import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stopwatch from './Stopwatch';

export default function Guesser(props) {
    let currentImage = props.character
    const [guess, setGuess] = useState('')
    const [mistakes, setMistakes] = useState(0)
    const [correctGuesses, setCorrectGuesses] = useState(0)

    const submitGuess = (event) => {
        event.preventDefault();
        setGuess(event.target.value)
        if (guess.toLowerCase() === currentImage.name.toLowerCase()) {
          setCorrectGuesses(old => ++old)
          props.setRandomImage()
        } else {
          setMistakes(old => ++old)
        }
        setGuess('')
      }

    const handleChange = (event) => {
        setGuess(event.target.value)
    }

    const stop = () => {
        clear()
    }

    const clear = () => {
        props.stopGame()
        currentImage = {}
        setGuess('')
        setCorrectGuesses(0)
        setMistakes(0)
    }

    return (
        <div>
            <img src={currentImage.location} className="App-logo" alt="Character would go here" />
            <div>
              Correct:
              <div className="correct-color">
                {correctGuesses} <div className="inline">/ {props.charactersLength}</div>
              </div>
            </div>
            <div>
              Mistakes: 
              <div className="mistakes-color">
                {mistakes} <div className="inline">/ {props.charactersLength}</div>
              </div>
            </div>
            <Form onSubmit={submitGuess}>
              <Form.Group controlId="formGuess">
                <Form.Label>Romaji</Form.Label>
                <Form.Control type="text" placeholder="Enter Guess" value={guess} onChange={handleChange} autoFocus></Form.Control>
              </Form.Group>
            </Form>
            <Container>
              <Row>
                <Col xs={12} md={6}><Button variant="danger" onClick={stop}>Stop</Button></Col>
                <Col xs={12} md={6}><Button variant="secondary">Pause</Button></Col>
                <Col xs={12}><Stopwatch /></Col>
              </Row>
            </Container>
        </div>
    )
}
