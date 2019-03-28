import * as Papa from 'papaparse';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideBar from '../Sidebar/Sidebar';
import Treemap from '../Treemap/Treemap';
import './App.css';

class App extends Component {
  state = {
    fullData: [],
    filter: {
      countries: ["Netherlands", "Belgium"],
    },
    allCountries: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    let parent = this
    let path = require("../../assets/data.csv")
    Papa.parse(path, {
      download: true,
      header: true,
      complete: function (results) {
        parent.setState({
          fullData: results.data
        })
        parent.getCountries()
      }
    });
  }

  getCountries = () => {
    this.setState({
      allCountries: this.state.fullData
        .filter((d) => {
          return parseInt(d.year) === 2012
        })
        .map((d) => {
          return {
            label: d.country,
            value: d.country,
          }
        })
    })
  }

  renderRoutes = () => {
    return (
      <Switch>
        <Route
          exact
          path="/treemap"
          render={(props) => <Treemap
            fullData={this.state.fullData}
            filter={this.state.filter} />} />
      </Switch>
    )
  }

  render() {
    return (
      <Router className="hallo">
        <div>
          <div className="flex-container">
            <div className="content" id="content">
              {this.renderRoutes()}
            </div>
            <SideBar
              allCountries={this.state.allCountries} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
