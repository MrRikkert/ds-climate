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
      countries: ["Netherlands"],
      relative: false,
    },
    allCountries: [],
  }

  componentDidMount() {
    this.getData()
  }

  getFilteredData = () => {
    return this.state.fullData.filter((d) => {
      if (parseInt(d.year) === 2012 && this.state.filter.countries.indexOf(d.country) > -1) {
        return true
      }
      return false
    })
  }

  setRelative = (event) => {
    let filter = this.state.filter
    filter.relative = !filter.relative
    this.setState({
      filter: filter,
    })
  }

  updateSelectedCountries = (selected) => {
    let filter = this.state.filter
    filter.countries = selected.map((d) => {
      return d.label
    })
    this.setState({
      filter: filter
    })
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
            filter={this.state.filter}
            getFilteredData={this.getFilteredData} />} />
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
              allCountries={this.state.allCountries}
              updateSelectedCountries={this.updateSelectedCountries}
              setRelative={this.setRelative}
              filter={this.state.filter} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
