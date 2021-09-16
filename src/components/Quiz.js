import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Form, Image } from 'react-bootstrap'
import { Link, useHistory, withRouter } from 'react-router-dom'
import './Quiz.css';

function Quiz(props) {
    const [syllabary] = useState('');
    const [useHiragana] = useState(props.location.state?.hiragana);
    const [useKatakana] = useState(props.location.state?.katakana);
    const [useCombinations] = useState(props.location.state?.combinations);
    const [characters, setCharacters] = useState(null);
    const [currentCharacter, setCurrentCharacter] = useState(null);
    const [input, setInput] = useState('');
    const [wrong, setWrong] = useState(false);
    const [mistakes, setMistakes] = useState(0);
    const [correct, setCorrect] = useState(0);
    const history = useHistory();
    const [totalCharacters, setTotalCharacters] = useState(0);

    const sanitize = (s) => {
        return s.toLowerCase().replace(/[0-9]/g, '')
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!input || input.length === 0) { return; }

        console.log('current input:', input);
        if (sanitize(input) === sanitize(currentCharacter.name)) {
            console.log('Correct guess!');
            setWrong(false);
            setCharacters(characters.filter(character => character.name !== currentCharacter.name));
            setCorrect(correct + 1);
        } else {
            console.log('Incorrect guess... it\'s', currentCharacter.name);
            setWrong(true);
            setMistakes(mistakes + 1);
        }

        setInput('');
    };

    useEffect(() => {
        const loadCharacters = (hiragana, katakana, combinations) => {
            fetch('characters.json')
                .then(res => res.json())
                .then(list => {
                    if (!hiragana) {
                        list = list.filter(char => char.syllabary !== 'hiragana');
                    }
                    if (!katakana) {
                        list = list.filter(char => char.syllabary !== 'katakana');
                    }
                    if (!combinations)  {
                        list = list.filter(char => char.category !== 'combinations');
                    }
                    setCharacters(list);
                    setTotalCharacters(list.length);
                });
        };
        console.log(`Fetching character set(s)...`);
        loadCharacters(useHiragana, useKatakana, useCombinations);
    }, [useHiragana, useKatakana, useCombinations]);

    useEffect(() => {

        const goFinish = (correct, mistakes) => {
            history.push({
                pathname: "/finish",
                state: { correct: correct, mistakes: mistakes }
            })
        };

        if (characters && characters.length === 0) {
            goFinish(correct, mistakes);
        }

        if (characters && characters.length > 0) {
            const setRandomCharacter = (chars) => {
                return chars[generateRandomNumber(chars)];
            }

            const generateRandomNumber = (chars) => {
                return Math.floor(Math.random() * chars.length);
            }
            if (!wrong) {
                console.log('Setting current character...');
                setCurrentCharacter(setRandomCharacter(characters));
            }
        }
    }, [characters, history, correct, mistakes, wrong]);

    useEffect(() => {
        if (currentCharacter) {
            console.log('Current character is set:', currentCharacter.name, currentCharacter.syllabary);
        }
    }, [currentCharacter]);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    return (
        <React.Fragment>

            <Card.Img as={Image} className="invert-image" fluid={true} src={currentCharacter?.location} alt={syllabary} />

            <Card.Body>

                <Card.Title>{props.syllabary} Quiz</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Identify the character!</Card.Subtitle>

                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="validationInput">
                        <Form.Control autoComplete="off" onChange={handleInputChange} value={input} type="text" placeholder="Romaji" />
                        {wrong && <Alert variant={'danger'}>Wrong! Try again!</Alert>}
                    </Form.Group>
                    <div className="submit-container">
                        <Button type="submit">Submit</Button>
                        <div className="stats-container">
                            <span style={{ marginLeft: '5px' }}><span className="correct-color">{correct}</span> / {totalCharacters}</span>
                            <span style={{ marginLeft: '5px'}} className="wrong-color">{mistakes}</span>
                        </div>
                        <div className="float-end">
                        <Link to="/" className="remove-link-dec">
                            <Button variant="secondary">Cancel</Button>
                        </Link>
                        </div>
                    </div>
                </Form>

            </Card.Body>

            <Card.Footer className="text-muted">
                <Link to="/" className="remove-link-dec">
                    <Button variant="secondary">Cancel</Button>
                </Link>
            </Card.Footer>

        </React.Fragment>
    )
}

export default withRouter(Quiz)