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

  getFilteredData = (filterYear = true, filterCountries = true) => {
    let data = this.state.fullData
      .filter((d) => {
        return (parseInt(d.year) >= 1970 && parseInt(d.year) <= 2012)
      })
      .filter((d) => {
        return !(regions.indexOf(d.country) > -1)
      });

    if (filterYear) {
      data = data.filter((d) => {
        if (parseInt(d.year) === parseInt(this.state.filter.year)) {
          return true
        }
        return false;
      })
    }
    if (filterCountries) {
      data = data.filter((d) => {
        let countrySelected = this.state.filter.countries.map((d) => { return d.country }).indexOf(d.country) > -1

        if (countrySelected) {
          return true
        }
        return false;
      })
    }
    return data
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
      stateFilters.push(filters[i])
    }
    this.setState({
      selectedFilters: stateFilters
    })
  }

}

const regions = [
  "Arab World",
  "Caribbean small states",
  "Central Europe and the Baltics",
  "Early-demographic dividend",
  "East Asia & Pacific",
  "East Asia & Pacific (excluding high income)",
  "East Asia & Pacific (IDA & IBRD countries)",
  "Euro area",
  "Europe & Central Asia",
  "Europe & Central Asia (excluding high income)",
  "Europe & Central Asia (IDA & IBRD countries)",
  "European Union",
  "Fragile and conflict affected situations",
  "Heavily indebted poor countries (HIPC)",
  "High income",
  "IBRD only",
  "IDA & IBRD total",
  "IDA blend",
  "IDA only",
  "IDA total",
  "Late-demographic dividend",
  "Latin America & Caribbean",
  "Latin America & Caribbean (excluding high income)",
  "Latin America & the Caribbean (IDA & IBRD countries)",
  "Least developed countries: UN classification",
  "Low & middle income",
  "Low income",
  "Lower middle income",
  "Middle East & North Africa",
  "Middle East & North Africa (excluding high income)",
  "Middle East & North Africa (IDA & IBRD countries)",
  "Middle income",
  "North America",
  "Not classified",
  "OECD members",
  "Other small states",
  "Pacific island small states",
  "Post-demographic dividend",
  "Pre-demographic dividend",
  "Small states",
  "South Asia",
  "South Asia (IDA & IBRD)",
  "Sub-Saharan Africa",
  "Sub-Saharan Africa (excluding high income)",
  "Sub-Saharan Africa (IDA & IBRD countries)",
  "Upper middle income",
  "World",
]

export default Filter;
