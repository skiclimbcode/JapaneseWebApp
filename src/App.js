import './App.css';
import React, { useState, useEffect } from 'react'
import { useStateWithCallbackLazy } from 'use-state-with-callback'
import Button from 'react-bootstrap/Button'
import Guesser from './components/Guesser'
import CountdownOverlay from './components/CountdownOverlay'
import Finish from './components/Finish';
import AppNavbar from './components/AppNavbar';

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
  const [guessTimes, setGuessTimes] = useState([])
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useStateWithCallbackLazy(0)
  const [pauseStartTime, setPauseStartTime] = useState(0)
  const [pauseEndTime, setPauseEndTime] = useState(0)

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
    if (characters.length === 0) {
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
    setGuessTimes([])
    setStartTime(0)
    setEndTime(0)
    setPauseStartTime(0)
    setPauseEndTime(0)
  }

  const removeCountdown = () => {
    setStartCountdown(false)
    setStartGuessing(true)
  }

  const setRandomImage = () => {
    setStartTime(Date.now())
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
    setCorrectGuesses(correct)
  }

  const updateMistakes = (mistakes) => {
    setMistakes(mistakes)
  }

  const updateEndTime = (end) => {
    setEndTime(end, e => {
      const pauseLength = pauseEndTime - pauseStartTime
      console.log('pauseLength:', pauseLength)
      setGuessTimes(old => [...old, (e - startTime) - pauseLength])
    })
  }

  const pauseGame  = () => {
    setPauseStartTime(Date.now())
  }

  const resumeGame = () => {
    setPauseEndTime(Date.now())
  }

  return (
    <div className="App-center">
      <AppNavbar />
      <div className="App-content">
        { !gameOver && !startGuessing && !startCountdown && <Button variant="primary" className="start-button" onClick={startGame}>Start Hiragana Quiz</Button> }
        
        { !gameOver && startCountdown && <CountdownOverlay removeCountdown={removeCountdown}/> }
        { !gameOver && startGuessing && 
            <Guesser character={currentImage}
              restart={restart}
              pauseGame={pauseGame}
              resumeGame={resumeGame}
              setRandomImage={setRandomImage}
              charactersLength={characters.length}
              updateCorrectGuesses={updateCorrectGuesses}
              updateMistakes={updateMistakes}
              endTime={updateEndTime} />}
        { gameOver && <Finish restart={restart}
                              correct={correctGuesses}
                              mistakes={mistakes}
                              guessTimes={guessTimes}
                              pauseLength={pauseEndTime - pauseStartTime} /> }
      </div>
    </div>
  );
}

export default App;
