import './AppNavbar.css'
import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { Container, Nav } from 'react-bootstrap'

export default function AppNavbar() {

    return (
        <Navbar className="remove-padding" bg="dark" fixed="top" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/" className="cursor-pointer">
                    <img src="hiragana-character-set/a-logo.png" className="d-inline-block align-top invert-image" width="40" height="40" alt="logo" /> Practice Syllabaries
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/results">Results</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
