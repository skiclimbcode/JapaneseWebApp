import './App.css';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stopwatch from './timers/Stopwatch';

function App() {
  const [data, setData] = useState([])
  const [guess, setGuess] = useState('')
  const [currentImage, setCurrentImage] = useState({})
  const [guessHistory, setGuessHistory] = useState([])
  const [startGuessing, setStartGuessing] = useState(false)
  const [mistakes, setMistakes] = useState(0)
  const [correctGuesses, setCorrectGuesses] = useState(0)

  const getData = () => {
    fetch('hiragana.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'appliation/json'
      }
    }).then(res => {
      console.log('res:', res)
      return res.json()
    }).then(jsonRes => {
      console.log('jsonRes:', jsonRes)
      setData(jsonRes)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const handleChange = (event) => {
    setGuess(event.target.value)
  }

  const submitGuess = (event) => {
    console.log('guess submitted!')
    event.preventDefault();
    setGuess(event.target.value)
    if (guess.toLowerCase() === currentImage.name.toLowerCase()) {
      console.log('Correct guess!')
      setRandomImage()
      setCorrectGuesses(old => ++old)
    } else {
      console.log('Wrong guess!')
      setMistakes(old => ++old)
    }
    setGuess('')
    console.log('guess history:', guessHistory)
  }

  const setRandomImage = () => {
    console.log('data:', data)
    const min = 0
    const max = data.length - 1
    let rand = generateRand(min, max)
    console.log('rand:', rand)
    
    while (guessHistory.includes(data[rand].name)) {
      rand = generateRand(min, max)
    }
    setCurrentImage(data[rand])
    setGuessHistory(old => [...old, data[rand].name])
  }

  const generateRand = (min, max) => {
    return Math.floor(min + Math.random() * (max - min))
  }

  const startGame = () => {
    setStartGuessing(true)
    setRandomImage()
  }

  const stop = () => {
    clear()
  }

  const clear = () => {
    setGuessHistory([])
    setCurrentImage({})
    setGuess('')
    setCorrectGuesses(0)
    setMistakes(0)
    setStartGuessing(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        {!startGuessing && <Button variant="primary" onClick={startGame}>Start Guessing</Button>}
        {
          startGuessing && data && data.length > 0 &&
          <div>
            <img src={currentImage.location} className="App-logo" alt="logo" />
            <p>Correct: <div className="correct-color">{correctGuesses}</div></p>
            <p>Mistakes: <div className="mistakes-color">{mistakes}</div></p>
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
        }
      </header>
    </div>
  );
}

export default App;
