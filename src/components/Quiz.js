import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Quiz(props) {
    const [syllabary] = useState(props.syllabary.toLowerCase())
    const [characters, setCharacters] = useState(null)
    const [currentCharacter, setCurrentCharacter] = useState(null)
    const [input, setInput] = useState(null)

    const handleSubmit = (event) => {
        console.log('current input:', input);
        event.preventDefault();
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
        if (characters) {
            console.log("Fetched character set.")
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
            console.log('Current character is set:', currentCharacter)
        }
    }, [currentCharacter])

    const handleInputChange = (event) =>  {
        setInput(event.target.value)
    }

    return (
        <React.Fragment>
            <Card.Img variant="top" style={{ height: '40vmin' }} src={currentCharacter?.location} alt={syllabary} />
            <Card.Body>
                <Card.Title>{props.syllabary} Quiz</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Identify the character!</Card.Subtitle>

                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="validationInput">
                        <Form.Control onChange={handleInputChange} type="text" placeholder="Romaji" />
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>
            </Card.Body>
            <Card.Footer className="text-muted">
                <Button variant="secondary">
                    <Link to="/" className="remove-link-dec">Cancel</Link>
                </Button>
            </Card.Footer>
        </React.Fragment>
    )
}

export default Quiz