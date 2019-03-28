import React, { Component } from 'react';
import Navbar from "../Navbar/Navbar"
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Treemap from '../Treemap/Treemap';
import SideBar from '../Sidebar/Sidebar';
import * as Papa from 'papaparse';

class App extends Component {
  getData = (parent, transformData) => {
    let path = require("../../assets/data.csv")
    Papa.parse(path, {
      download: true,
      header: true,
      complete: function (results) {
        parent.setState({
          fullData: results.data
        })
        transformData()
      }
    });
  }

  renderRoutes = () => {
    return (
      <Switch>
        <Route
          exact
          path="/treemap"
          render={(props) => <Treemap getData={this.getData} />} />
      </Switch>
    )
  }

  render() {
    return (
      <Router>
        <div>
          <div className="flex-container">
            <div className="content" id="content">
              {this.renderRoutes()}
            </div>
            <SideBar />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
