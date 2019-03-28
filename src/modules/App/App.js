import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Treemap from '../Treemap/Treemap';
import SideBar from '../Sidebar/Sidebar';
import * as Papa from 'papaparse';

class App extends Component {
  state = {
    fullData: []
  }

  componentDidUpdate(prevProps) {
  }

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
          render={(props) => <Treemap
            getData={this.getData} />} />
      </Switch>
    )
  }

  getCountries = (parent) => {
    // return this.state.fullData.map((d) => {
    //   return {
    //     label: d.country,
    //     value: d.country
    //   }
    // })

    let path = require("../../assets/data.csv")
    Papa.parse(path, {
      download: true,
      header: true,
      complete: function (results) {
        parent.setState({
          options: results.data
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
    });
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
              getCountries={this.getCountries} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
