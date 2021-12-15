import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router';
import './Finish.css'
import Timer from './Timer';
import { HouseDoorFill } from 'react-bootstrap-icons';
import ls from 'local-storage'
import { getCurrentDate } from '../utils/Util';

const average = (list) => list?.reduce((a, b) => a + b) / list?.length;

const add = (list) => list?.reduce((a, b) => a + b);

const buildResults = (correct, mistakes, times, combinations, syllabary) =>
    new Result(correct, mistakes, average(times), correct - mistakes,
        add(times), getCurrentDate(), combinations, syllabary);

class Result {
    mistakes;
    correct;
    average;
    score;
    totalTime;
    date;
    combinations;
    syllabary;

    constructor(correct, mistakes, average, score, totalTime, date, combinations, syllabary) {
        this.correct = correct;
        this.mistakes = mistakes;
        this.average = average;
        this.score = score;
        this.totalTime = totalTime;
        this.date = date;
        this.combinations = combinations;
        this.syllabary = syllabary;
    }
}


function Finish(props) {
    const [correct] = useState(props.location.state?.correct);
    const [mistakes] = useState(props.location.state?.mistakes);
    const [times] = useState(props.location.state?.times);
    const [usedCombinations] = useState(props.location.state?.combinations);
    const [syllabary] = useState(props.location.state?.syllabary);
    const [isTimed, setIsTimed] = useState(true);

    useEffect(() =>  {
        console.log('correct mistakes times:', correct, mistakes, times);
        ls(getCurrentDate(), buildResults(correct, mistakes, times, usedCombinations, syllabary));
        times.forEach(time => {
            if (time === 0) setIsTimed(false);
        })
    }, [correct, mistakes, times, isTimed, usedCombinations, syllabary]);

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
                {isTimed &&
                <>
                    <Row>
                        <Col>
                            Avg Time:
                        </Col>
                        <Col>
                            <span className="float-end"><Timer time={average(times)}/></span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Total Time:
                        </Col>
                        <Col>
                            <span className="float-end"><Timer time={add(times)} /></span>
                        </Col>
                    </Row>
                </>}
                <br />
                <Row>
                    <Col xs={12} className="text-center">
                        <Link to="/" className="remove-link-dec"><Button variant="primary"><HouseDoorFill /> Home</Button></Link>
                    </Col>
                </Row>
            </Container>
        </Card.Body>
    )
}

export default withRouter(Finish)
