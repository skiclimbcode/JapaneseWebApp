import './App.css';
import AppNavbar from './components/AppNavbar'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './components/Home';
import { Card } from 'react-bootstrap';
import Quiz from './components/Quiz';

function App() {

  return (
    <Router>
      <AppNavbar />

      <Switch>
        <div className="center-parent">
          <Card className="center-content">
            <Route path="/hiragana">
              <Quiz syllabary="Hiragana" />
            </Route>
            <Route path="/katakana">
              <Quiz syllabary="Katakana" />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Card>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
