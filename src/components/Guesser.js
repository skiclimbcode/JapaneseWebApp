import './Guesser.css'
import React, { useState } from 'react'
import { useStateWithCallbackLazy } from 'use-state-with-callback'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Guesser(props) {
    let currentImage = props.character
    const [guess, setGuess] = useState('')
    const [mistakes, setMistakes] = useStateWithCallbackLazy(0)
    const [correctGuesses, setCorrectGuesses] = useStateWithCallbackLazy(0)

    const submitGuess = (event) => {
        event.preventDefault();
        setGuess(event.target.value)
        if (sanitize(guess) === sanitize(currentImage.name)) {
          setCorrectGuesses(old => ++old, c => {
            console.log('correct in Guesser.js:', c)
            props.updateCorrectGuesses(c)
            props.setRandomImage()
          })
        } else {
          setMistakes(old => ++old, m => {
            props.updateMistakes(m)
          })
        }
        setGuess('')
      }

    const handleChange = (event) => {
        setGuess(event.target.value)
    }

    const restart = () => {
        clear()
    }

    const pause = () => {
      props.pauseGame()
    }

    const clear = () => {
        props.restart()
        currentImage = {}
        setGuess('')
        setCorrectGuesses(0)
        setMistakes(0)
    }

    const sanitize = (s) => {
      return s.toLowerCase().replace(/[0-9]/g, '')
    }

    return (
        <div>
            <img src={currentImage.location} className="App-logo" alt="Character would go here" />
            <div>
              Left:
              <div className="correct-color">
                {props.charactersLength - correctGuesses}
              </div>
            </div>
            <div>
              Mistakes: 
              <div className="mistakes-color">
                {mistakes}
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
                <Col xs={12} md={6}><Button variant="danger" onClick={restart}>Restart</Button></Col>
                {/* <Col xs={12} md={6}><Button variant="secondary" onClick={pause}>Pause</Button></Col> */}
              </Row>
            </Container>
        </div>
    )
}
