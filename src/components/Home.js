import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <Card.Body>
            <Card.Title>Learn Japanese!</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Practice your Hiragana and Katakana skills</Card.Subtitle>
            <Card.Text>
                With this web app you can practice your Hiragana and Katakana syllabaries.<br />
                Just click on the syllabary you'd like to practice!
            </Card.Text>
            <Container>
                <Row>
                    <Col xs={6} className="text-center">
                        <Link to="/hiragana" className="remove-link-dec"><Button variant="primary">Hiragana</Button></Link>
                    </Col>
                    <Col xs={6} className="text-center">
                        <Link to="katakana" className="remove-link-dec"><Button variant="primary">Katakana</Button></Link>
                    </Col>
                </Row>

            </Container>
        </Card.Body>
    )
}

export default Home

