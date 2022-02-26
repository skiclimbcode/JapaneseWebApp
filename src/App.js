import './App.css';
import AppNavbar from './components/AppNavbar'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './components/Home';
import { Card } from 'react-bootstrap';
import Quiz from './components/Quiz';
import Finish from './components/Finish';
import Footer from './components/Footer';
import Results from './components/Results';

function App() {

  return (
    <Router>
      <AppNavbar />

      <div className="center-parent">
        <Card className="card-overflow center-content card-size" text="light" bg="dark" border="dark">
          <Switch>
            <Route path="/JapaneseWebApp/quiz">
              <Quiz />
            </Route>

            <Route path="/JapaneseWebApp/hiragana">
              
            </Route>
            <Route path="/JapaneseWebApp/katakana">
              
            </Route>
            <Route path="/JapaneseWebApp/finish">
              <Finish />
            </Route>
            <Route path="/JapaneseWebApp/results">
              <Results />
            </Route>
            <Route exact path="/JapaneseWebApp">
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
