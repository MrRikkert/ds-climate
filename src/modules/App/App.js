import React, { Component } from 'react';
import Navbar from "../Navbar/Navbar"
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Treemap from '../Treemap/Treemap';
import * as Papa from 'papaparse';

class App extends Component {
  state = {}

  componentDidMount() {
    let parent = this
    let path = require("../../assets/data.csv")
    Papa.parse(path, {
      download: true,
      header: true,
      complete: function (results) {
        parent.setState({
          data: results.data
        })
      }
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/treemap"
              render={(props) => <Treemap data={this.state.data} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
