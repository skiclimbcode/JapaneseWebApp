import './App.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Guesser from './components/Guesser';

function App() {
  const characterSetName = 'hiragana'
  const [characters, setCharacters] = useState([])
  const [startGuessing, setStartGuessing] = useState(false)
  const [currentImage, setCurrentImage] = useState({})
  const [guessHistory, setGuessHistory] = useState([])

  const getCharacters = () => {
    fetch(`${characterSetName.toLowerCase()}.json`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'appliation/json'
      }
    }).then(res => {
      return res.json()
    }).then(jsonRes => {
      setCharacters(jsonRes)
    })
  }

  useEffect(() => {
    getCharacters()
  }, [])

  const startGame = () => {
    setRandomImage()
    setStartGuessing(true)
  }

  const stopGame = () => {
    setStartGuessing(false)
  }

  const setRandomImage = () => {
    console.log('Setting random image!')
    const min = 0
    const max = characters.length - 1
    let rand = generateRand(min, max)

    while (guessHistory.includes(characters[rand].name)) {
        rand = generateRand(min, max)
    }
    setCurrentImage(characters[rand])
    setGuessHistory(old => [...old, characters[rand].name])
    console.log(guessHistory)
  }

  const generateRand = (min, max) => {
    return Math.floor(min + Math.random() * (max - min))
  }

  return (
    <div className="App">
      <header className="App-header">
        {!startGuessing && <Button variant="primary" onClick={startGame}>Start Quiz</Button>}
        {
          startGuessing &&
            characters &&
              characters.length > 0 &&
                <Guesser character={currentImage} stopGame={stopGame} setRandomImage={setRandomImage} charactersLength={characters.length}/>
        }
      </header>
    </div>
  );
}

export default App;
