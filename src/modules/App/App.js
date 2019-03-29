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
      year: 1970,
    },
    allCountries: [],
    animating: false,
    title: "Please select a graph"
  }

  componentDidMount() {
    this.getData()

    setInterval(() => {
      if (this.state.filter.year < 2014 && this.state.animating) {
        let filter = this.state.filter
        filter.year = parseInt(filter.year) + 1
        this.setState({
          filter: filter
        })
      } else {
        this.setState({
          animating: false
        })
      }
    }, 500)
  }

  setTitle = (title) => {
    this.setState({
      title: title
    })
  }

  getFilteredData = () => {
    return this.state.fullData.filter((d) => {
      if (parseInt(d.year) === parseInt(this.state.filter.year) &&
        this.state.filter.countries.indexOf(d.country) > -1) {
        return true
      }
      return false
    })
  }

  changeYear = (event) => {
    let filter = this.state.filter
    filter.year = event.target.value
    this.setState({
      filter: filter
    })
  }

  setRelative = (event) => {
    let filter = this.state.filter
    filter.relative = !filter.relative
    this.setState({
      filter: filter,
    })
  }

  ToggleYearTimer = () => {
    this.setState({
      animating: !this.state.animating
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
            getFilteredData={this.getFilteredData}
            setTitle={this.setTitle} />} />
      </Switch>
    )
  }

  render() {
    return (
      <Router>
        <div>
          <div className="title-bar">{this.state.title}</div>
          <div className="flex-container">
            <div className="content" id="content">
              {this.renderRoutes()}
            </div>
            <SideBar
              allCountries={this.state.allCountries}
              updateSelectedCountries={this.updateSelectedCountries}
              setRelative={this.setRelative}
              filter={this.state.filter}
              changeYear={this.changeYear}
              ToggleYearTimer={this.ToggleYearTimer} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
