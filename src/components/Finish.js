import React, { useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router';
import './Finish.css'
import Timer from './Timer';

function Finish(props) {
    const [correct] = useState(props.location.state?.correct);
    const [mistakes] = useState(props.location.state?.mistakes);
    const [times] = useState(props.location.state?.times);
    return (
        <Card.Body className="card-size">
            <Card.Title>All done!</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Here are some stats.</Card.Subtitle>
            <Container fluid>
                <Row>
                    <Col>
                        Correct:
                    </Col>
                    <Col>
                        <span className="float-end correct-color">{correct}</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Mistakes:
                    </Col>
                    <Col>
                        <span className="float-end wrong-color">{mistakes}</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Score:
                    </Col>
                    <Col>
                        <span className="float-end" style={{fontWeight: 'bold'}}>{correct - mistakes}</span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Avg Time:
                    </Col>
                    <Col>
                        <span className="float-end"><Timer time={times?.reduce((a, b) => a + b) / times?.length}/></span>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs={12} className="text-center">
                        <Link to="/" className="remove-link-dec"><Button variant="primary">Start Over</Button></Link>
                    </Col>
                </Row>
            </Container>
        </Card.Body>
    )
}

export default withRouter(Finish)
