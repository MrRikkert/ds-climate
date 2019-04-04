import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideBar from '../Sidebar/Sidebar';
import Treemap from '../Treemap/Treemap';
import Filter from "./Filter"
import './App.css';

const metrics = [
  { label: "normal", value: 1 },
  { label: "per population", value: 2 },
  { label: "per GDP per capita", value: 3 },
  { label: "per area (sq.km)", value: 4 }
]


class App extends Filter {
  state = {
    fullData: [],
    filter: {
      countries: ["Netherlands"],
      metric: metrics[0],
      year: 1970,
    },
    metrics: metrics,
    allCountries: [],
    animating: false,
    title: "Please select a graph"
  }

  renderRoutes = () => {
    return (
      <Switch>
        <Route
          exact
          path="/treemap">
          <Treemap
            fullData={this.state.fullData}
            filter={this.state.filter}
            getFilteredData={this.getFilteredData}
            setTitle={this.setTitle}
            getDivider={this.getDivider} />
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
              animating={this.state.animating} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
