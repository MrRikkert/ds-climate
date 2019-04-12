import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SideBar from '../Sidebar/Sidebar';
import Treemap from '../Treemap/Treemap';
import EmissionsPerCountry from "../EmissionsPerCountry/EmissionsPerCountry"
import EmissionVsGdp from "../EmissionsVsGdp/EmissionsVsGdp"
import Filter from "./Filter"
import './App.css';

const metrics = [
  { label: "normal", value: 1 },
  { label: "per population", value: 2 },
  { label: "per GDP per capita", value: 3 },
  { label: "per GDP", value: 4 },
  { label: "per area (sq.km)", value: 5 }
]

const emissionTypes = [
  { label: "CO2", value: "co2_e" },
  { label: "Methane", value: "methane_e" },
  { label: "Nitrous Oxide", value: "no_e" },
  { label: "Other", value: "other_e" },
  { label: "Total", value: "total_e" }
]

class App extends Filter {
  state = {
    fullData: [],
    filter: {
      emissionType: emissionTypes[0],
      countries: [],
      metric: metrics[0],
      year: 1970,
      yLog: false,
      xLog: false,
      animate: true,
    },
    selectedFilters: [],
    metrics: metrics,
    emissionTypes: emissionTypes,
    allCountries: [],
    animating: false,
    title: "Please select a graph"
  }

  commonProps = {
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
          <Treemap {...this.commonProps} />
        </Route>
        <Route
          exact
          path="/emission-per-country">
          <EmissionsPerCountry {...this.commonProps} />
        </Route>
        <Route
          exact
          path="/emission-vs-gdp-per-capita">
          <EmissionVsGdp {...this.commonProps} />
        </Route>
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
            <SideBar
              allCountries={this.state.allCountries}
              updateSelectedCountries={this.updateSelectedCountries}
              filter={this.state.filter}
              changeYear={this.changeYear}
              ToggleYearTimer={this.ToggleYearTimer}
              metrics={metrics}
              updateSelectedMetric={this.updateSelectedMetric}
              updateSelectedEmissionType={this.updateSelectedEmissionType}
              animating={this.state.animating}
              toggleLog={this.toggleLog}
              toggleAnimations={this.toggleAnimations}
              selectedFilters={this.state.selectedFilters}
              title={this.state.title}
              emissionTypes={this.state.emissionTypes} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
