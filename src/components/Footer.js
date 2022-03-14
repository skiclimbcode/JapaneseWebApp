import React from 'react'
import { CupFill, Github } from 'react-bootstrap-icons'
import './Footer.css'

function Footer() {
    return (
        <footer className="footer mt-auto py-3 bg-dark text-white">
            <div className="footer-container">
                <div>
                    © SkiClimbCode -
                </div>
                <div>
                    <Github /> <a className="remove-underline-color" href="https://www.github.com/SkiClimbCode">GitHub</a>
                </div>
                <div className="pull-right">
                    <a href="https://www.freepik.com/vectors/building">Building vector created by pikisuperstar - www.freepik.com</a>
                </div>
            </div>    
        </footer>
    )
}

export default Footer
