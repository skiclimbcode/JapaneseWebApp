import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Finish() {
    return (
        <Card.Body>
            <Card.Title>All done!</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Here are some stats.</Card.Subtitle>
            <Card.Text>
                Filler text
            </Card.Text>
            <Container>
                <Row>
                    <Col xs={12} className="text-center">
                        <Link to="/" className="remove-link-dec"><Button variant="primary">Start Over</Button></Link>
                    </Col>
                </Row>
            </Container>
        </Card.Body>
    )
}

export default Finish
