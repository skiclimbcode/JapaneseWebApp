import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import ls from 'local-storage'
import './Home.css'

function Home() {
    const [combinations,  setChecked] = useState(false);
    const [hiragana, setHiragana] = useState(false);
    const [katakana, setKatakana] = useState(false);
    const [isTimed, setIsTimed] = useState(false);
    const history = useHistory();

    const handleChecked = (e) => {
        switch (e.currentTarget.id) {
            case "combo": setChecked(e.currentTarget.checked);
            break;
            case "hiragana": setHiragana(e.currentTarget.checked);
            break;
            case "katakana": setKatakana(e.currentTarget.checked);
            break;
            case "timed": setIsTimed(e.currentTarget.checked);
            break;
            default: // this should never happen
        }
    }

    const handleStart = () => {
        history.push({
            pathname: "/quiz",
            state: { hiragana: hiragana, katakana: katakana, combinations: combinations, isTimed: isTimed }
        })
    }

    const handleClear = () => {
        ls.clear();
    }

    return (
        <Card.Body>
            <Card.Title>Japanese Syllabaries Quiz</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Practice your Hiragana and Katakana skills</Card.Subtitle>
            <Card.Text>
                With this web app you can practice the Hiragana and Katakana syllabaries.<br />
                Use the checkboxes below to configure your quiz!
            </Card.Text>
            <Container>
                <Row>
                    <Col xs={12}>
                        <Form>
                            <Form.Check id="hiragana" checked={hiragana} onChange={handleChecked} type="checkbox" label="Hiragana"/>
                            <Form.Check id="katakana" checked={katakana} onChange={handleChecked} type="checkbox" label="Katakana"/>
                            <Form.Check id="combo" checked={combinations} onChange={handleChecked} type="checkbox" label="Combinations (e.g. きゃ)"/>
                            <Form.Check id="timed" checked={isTimed} onChange={handleChecked} type="checkbox" label="Timed"/>
                        </Form>
                    </Col>
                    <Col xs={12}>
                        <Button onClick={handleStart} disabled={!hiragana && !katakana} variant="primary">Start</Button>
                    </Col>
                    <Col xs={12}>
                        <Button onClick={handleClear} variant="primary">Clear</Button>
                    </Col>
                </Row>
            </Container>
        </Card.Body>
    )
}

export default Home

