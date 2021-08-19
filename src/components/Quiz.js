import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Form, Image } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

function Quiz(props) {
    const [syllabary] = useState(props.syllabary.toLowerCase());
    const [characters, setCharacters] = useState(null);
    const [currentCharacter, setCurrentCharacter] = useState(null);
    const [input, setInput] = useState('');
    const [wrong, setWrong] = useState(false);
    const history = useHistory();

    const sanitize = (s) => {
        return s.toLowerCase().replace(/[0-9]/g, '')
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!input || input.length === 0) { return; }
        
        console.log('current input:', input);
        if (sanitize(input) === sanitize(currentCharacter.name)) {
            console.log('Correct guess!');
            setWrong(false);
            setCharacters(characters.filter(character => character.name !== currentCharacter.name));
        } else {
            console.log('Incorrect guess... it\'s', currentCharacter.name);
            setWrong(true);
        }

        setInput('');
    }

    useEffect(() => {
        const loadCharacters = (set) => {
            fetch(`${set}.json`)
                .then(res => res.json())
                .then(json => {
                    setCharacters(json)
                })
        }
        console.log(`Fetching character set for ${syllabary}...`)
        loadCharacters(syllabary)
    }, [syllabary])

    useEffect(() => {
        if (characters && characters.length == 0) {
            history.push("/finish");
        }
        if (characters && characters.length > 0) {
            console.log('Setting current character...')
            const setRandomCharacter = (chars) => {
                return chars[generateRandomNumber(chars)]
            }

            const generateRandomNumber = (chars) => {
                return Math.floor(Math.random() * chars.length)
            }

            setCurrentCharacter(setRandomCharacter(characters))
        }
    }, [characters])

    useEffect(() => {
        if (currentCharacter) {
            console.log('Current character is set:', currentCharacter.name);
        }
    }, [currentCharacter])

    const handleInputChange = (event) =>  {
        setInput(event.target.value);
    }

    return (
        <React.Fragment>

            <Card.Img as={Image} className="invert-image" fluid={true} src={currentCharacter?.location} alt={syllabary} />

            <Card.Body>

                <Card.Title>{props.syllabary} Quiz</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Identify the character!</Card.Subtitle>

                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="validationInput">
                        <Form.Control onChange={handleInputChange} value={input} type="text" placeholder="Romaji" />
                        { wrong && <Alert variant={'danger'}>Wrong! Try again!</Alert> }
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>

            </Card.Body>

            <Card.Footer className="text-muted">
                <Link to="/" className="remove-link-dec">
                    <Button variant="secondary">Cancel</Button>
                </Link>
                <span style={{marginLeft: '10px'}}>Characters left: {characters?.length}</span>
            </Card.Footer>

        </React.Fragment>
    )
}

export default Quiz