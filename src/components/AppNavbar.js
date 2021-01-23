import './AppNavbar.css'
import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function AppNavbar() {
    return (
        <header>
            <Navbar className="color-nav-bar" expand="lg" variant="dark" fixed="top">
            <Navbar.Brand href="#home">
                <img src="hiragana-character-set/a-logo.png" className="d-inline-block align-top invert-image" width="40" height="40" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#hiragna">Hiragana</Nav.Link>
                <Nav.Link href="#katakana">Katakana</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
      </header>
    )
}
