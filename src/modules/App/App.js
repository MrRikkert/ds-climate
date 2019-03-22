import React, { Component } from 'react';
import Navbar from "../Navbar/Navbar"
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Treemap from '../Treemap/Treemap';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/treemap" component={Treemap} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
