import './App.css';
import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Guesser from './components/Guesser'
import Stopwatch from './components/Stopwatch'
import CountdownOverlay from './components/CountdownOverlay'
import Finish from './components/Finish';

function App() {
  const characterSetName = 'hiragana'
  const [characters, setCharacters] = useState([])
  const [startGuessing, setStartGuessing] = useState(false)
  const [currentImage, setCurrentImage] = useState({})
  const [guessHistory, setGuessHistory] = useState([])
  const [startCountdown, setStartCountdown] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [blacklist, setBlacklist] = useState([])
  const [correctGuesses, setCorrectGuesses] = useState(0)
  const [mistakes, setMistakes] = useState(0)

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
    if (characters.length == 0) {
      getCharacters()
    }
  }, [])

  const startGame = () => {
    setStartCountdown(true)
    setRandomImage()
  }

  const restart = () => {
    setStartGuessing(false)
    setCurrentImage({})
    setGuessHistory([])
    setStartCountdown(false)
    setGameOver(false)
    setBlacklist([])
    setCorrectGuesses(0)
    setMistakes(0)
  }

  const pauseGame = () => {

  }

  const removeCountdown = () => {
    setStartCountdown(false)
    setStartGuessing(true)
  }

  const setRandomImage = () => {
    console.log('blacklist:', blacklist)
    if (guessHistory.length === characters.length) {
      setGameOver(true)
      return
    }
    const min = 0
    const max = characters.length - 1
    let rand = blrand(min, max, blacklist)
    setBlacklist(old => [...old, rand])


    setCurrentImage(characters[rand])
    setGuessHistory(old => [...old, characters[rand].name])
  }

  const blrand = function(min, max, blacklist) {
    if(!blacklist)
        blacklist = []
    let rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    let retv = 0;
    while(blacklist.indexOf(retv = rand(min,max)) > -1) { }
    return retv;
  }

  const updateCorrectGuesses = (correct) => {
    console.log('correct in App.js:', correct)
    setCorrectGuesses(correct)
  }

  const updateMistakes = (mistakes) => {
    setMistakes(mistakes)
  }

  return (
    <div className="App">
      <header className="App-header">
        { !gameOver && !startGuessing && !startCountdown && <Button variant="primary" onClick={startGame}>Start Quiz</Button> }
        
        { !gameOver && startCountdown && <CountdownOverlay removeCountdown={removeCountdown}/> }
        { !gameOver && startGuessing && 
            <Guesser character={currentImage}
              restart={restart}
              pauseGame={pauseGame}
              setRandomImage={setRandomImage}
              charactersLength={characters.length}
              updateCorrectGuesses={updateCorrectGuesses}
              updateMistakes={updateMistakes} />}
        { gameOver && <Finish restart={restart}
                              correct={correctGuesses}
                              mistakes={mistakes} /> }
      </header>
    </div>
  );
}

export default App;
