import React, { useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap'
import ls from 'local-storage';
import './Results.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { convertToSeconds } from '../utils/Util';

function Results() {
    const [all, setAll] = useState(true);
    const [combinations,  setChecked] = useState(false);
    const [hiragana, setHiragana] = useState(false);
    const [katakana, setKatakana] = useState(false);
    const [data, setData] = useState([]);

    const handleChecked = (e) => {
        switch (e.currentTarget.id) {
            case "combo":
                setChecked(e.currentTarget.checked);
                setAll(false);
            break;
            case "hiragana":
                setHiragana(e.currentTarget.checked);
                setAll(false);
            break;
            case "katakana":
                setKatakana(e.currentTarget.checked);
                setAll(false);
            break;
            case "all":
                setAll(e.currentTarget.checked);
                setChecked(false);
                setHiragana(false);
                setKatakana(false);
            break;
            default: // this should never happen
        }
    }

    const defaultSorted = [{
        dataField: 'date',
        order: 'desc'
    }];

    const columns = [{
        dataField: 'date',
        text: 'Date',
        sort: true
    }, {
        dataField: 'correct',
        text: 'Correct'
    }, {
        dataField: 'mistakes',
        text: 'Mistakes'
    }, {
        dataField: 'score',
        text: 'Score',
        sort: true
    }, {
        dataField: 'average',
        text: 'Avg Time'
    }, {
        dataField: 'totalTime',
        text: 'Total Time'
    }, {
        dataField: 'syllabary',
        text: 'Syllabary'
    }, {
        dataField: 'combinations',
        text: 'Combos'
    }];

    const pagination = paginationFactory({
        sizePerPage: 5,
        sizePerPageList: []
    });

    useEffect(() => {
        console.log('hi there!');
        if (!hiragana && !katakana) {
            setChecked(false);
        }
        setData(Object.keys(ls.getStorage())
        .filter(key => {
            let result = ls.get(key);
            if (all) {
                return true;
            }
            if (hiragana) {
                if (result.syllabary === 'Both' || result.syllabary === 'Hiragana') {
                    if (result.combinations) {
                        if (combinations) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    return true;
                }
            }
            if (katakana) {
                if (result.syllabary === 'Both' || result.syllabary === 'Katakana') {
                    if (result.combinations) {
                        if (combinations) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    return true;
                }
            }
            return false;
        })
        .map(key => {
            let result = ls.get(key);
            result.average = result.average === 0 ? 'N/A' : convertToSeconds(result.average);
            result.totalTime = result.totalTime === 0 ? 'N/A' : convertToSeconds(result.totalTime);
            return result;
        }));
    }, [all, combinations, hiragana, katakana]);

    useEffect(() => {

    }, [data, combinations, hiragana, katakana, all]);

    return (
        <Card.Body className="card-size">
            <Card.Title>Past Results</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Here are some stats.</Card.Subtitle>
            <Form>
            <Form.Check id="all" checked={all} onChange={handleChecked} type="checkbox" label="All"/>
                <Form.Check id="hiragana" checked={hiragana} onChange={handleChecked} type="checkbox" label="Hiragana"/>
                <Form.Check id="katakana" checked={katakana} onChange={handleChecked} type="checkbox" label="Katakana"/>
                <Form.Check disabled={!hiragana && !katakana} id="combo" checked={combinations} onChange={handleChecked} type="checkbox" label="Combinations (e.g. きゃ)"/>
            </Form>
            <BootstrapTable defaultSorted={defaultSorted}
                classes="table-text-color" 
                keyField='date'
                data={data}
                columns={columns}
                pagination={pagination} />
        </Card.Body>
    )
}

export default Results
