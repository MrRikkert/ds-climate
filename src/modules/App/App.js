import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideBar from '../Sidebar/Sidebar';
import Treemap from '../Treemap/Treemap';
import EmissionsAreaGraph from "../EmissionsAreaGraph/EmissionsAreaGraph"
import Filter from "./Filter"
import './App.css';

const metrics = [
  { label: "normal", value: 1, yMinLog: 1, yMaxLog: 35000000, },
  { label: "per population", value: 2, yMinLog: 0.000001, yMaxLog: 1 },
  { label: "per GDP per capita", value: 3, yMinLog: 0.1, yMaxLog: 35000 },
  { label: "per area (sq.km)", value: 4, yMinLog: 0.01, yMaxLog: 10 }
]

class App extends Filter {
  state = {
    fullData: [],
    filter: {
      countries: [],
      metric: metrics[0],
      year: 1970,
      log: false,
      animate: true,
    },
    selectedFilters: [],
    metrics: metrics,
    allCountries: [],
    animating: false,
    title: "Please select a graph"
  }

  commomMethods = {
    fullData: this.state.fullData,
    filter: this.state.filter,
    getFilteredData: this.getFilteredData,
    setTitle: this.setTitle,
    getDivider: this.getDivider,
    setAvailibleFilters: this.setAvailibleFilters
  }

  renderRoutes = () => {
    return (
      <Switch>
        <Route
          exact
          path="/treemap">
          <Treemap {...this.commomMethods} />
        </Route>
        <Route
          exact
          path="/emission-per-country">
          <EmissionsAreaGraph {...this.commomMethods} />
        </Route>
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
              ToggleYearTimer={this.ToggleYearTimer}
              metrics={metrics}
              updateSelectedMetric={this.updateSelectedMetric}
              animating={this.state.animating}
              toggleLog={this.toggleLog}
              toggleAnimations={this.toggleAnimations}
              selectedFilters={this.state.selectedFilters} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
