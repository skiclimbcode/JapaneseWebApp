import './App.css';
import AppNavbar from './components/AppNavbar'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './components/Home';
import { Card } from 'react-bootstrap';
import Quiz from './components/Quiz';
import Finish from './components/Finish';
import Footer from './components/Footer';

function App() {

  return (
    <Router>
      <AppNavbar />

      <div className="center-parent">
        <Card className="center-content card-size" text="light" bg="dark" border="dark">
          <Switch>
            <Route path="/quiz">
              <Quiz />
            </Route>

            <Route path="/hiragana">
              
            </Route>
            <Route path="/katakana">
              
            </Route>
            <Route path="/finish">
              <Finish />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Card>
      </div>
      <Footer className="footer" />
    </Router>
  );
}

export default App;
