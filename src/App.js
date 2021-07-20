import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import TodoPage from './components/TodoPage'

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={TodoPage}/>
          <Route path="/home" exact component={Home}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
