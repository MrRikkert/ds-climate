import * as Papa from 'papaparse';
import { Component } from 'react';
import './App.css';
import ColorHelper from '../../helpers/ColorHelper';

class Filter extends Component {

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
        if (this.state.animating) {
          this.setState({
            animating: false
          })
        }
      }
    }, 500)
  }

  setTitle = async (title) => {
    this.setState({
      title: title
    })
  }

  getDivider = (row) => {
    switch (this.state.filter.metric.value) {
      case 1:
        return 1;
      case 2:
        return row.population
      case 3:
        return row.gdp_pc
      case 4:
        return row.area
      default:
        return 1;
    }
  }

  getFilteredData = (filterYear = true) => {
    return this.state.fullData.filter((d) => {
      let countrySelected = this.state.filter.countries.map((d) => { return d.country }).indexOf(d.country) > -1

      if (filterYear) {
        if (parseInt(d.year) === parseInt(this.state.filter.year) &&
          countrySelected) {
          return true
        }
      } else {
        if (countrySelected && parseInt(d.year) >= 1970 && parseInt(d.year) <= 2012) {
          return true
        }
      }
      return false
    })
  }

  changeYear = async (event) => {
    let filter = this.state.filter
    filter.year = event.target.value
    this.setState({
      filter: filter
    })
  }

  toggleLog = (axis) => {
    let filter = this.state.filter
    if (axis === "y") {
      filter.yLog = !filter.yLog
    } else {
      filter.xLog = !filter.xLog
    }
    this.setState({
      filter: filter
    })
  }

  ToggleYearTimer = async () => {
    this.setState({
      animating: !this.state.animating
    })
  }

  toggleAnimations = async () => {
    let filter = this.state.filter;
    filter.animate = !filter.animate
    this.setState({
      filter: filter
    })
  }

  updateSelectedCountries = async (selected) => {
    let filter = this.state.filter
    filter.countries = selected
      .map((d) => {
        return {
          label: d.label,
          value: d.label,
          country: d.label,
          color: ColorHelper.getColorFromString(d.label)
        }
      })
      .sort((a, b) => (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0))
    this.setState({
      filter: filter
    })
  }

  updateSelectedMetric = async (selected) => {
    let filter = this.state.filter
    filter.metric = selected
    this.setState({
      filter: filter
    })
  }

  updateSelectedEmissionType = async (selected) => {
    let filter = this.state.filter
    filter.emissionType = selected
    this.setState({
      filter: filter
    })
  }

  getData = async () => {
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
            color: ColorHelper.getColorFromString(d.country)
          }
        })
    })
  }

  setAvailibleFilters = (filters) => {
    let stateFilters = []
    for (let i = 0; i < filters.length; i++) {
      stateFilters.push(filters[i].name)
    }
    this.setState({
      selectedFilters: stateFilters
    })
  }

}

export default Filter;
