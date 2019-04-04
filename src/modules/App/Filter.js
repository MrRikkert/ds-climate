import * as Papa from 'papaparse';
import { Component } from 'react';
import './App.css';

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

    getDivider = (row) => {
        switch (this.state.filter.metric.value) {
            case 1:
                return 1;
            case 2:
                return row.population
            case 3:
                return row.gdp_pc
            default:
                return 1;
        }
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

    updateSelectedMetric = (selected) => {
        let filter = this.state.filter
        filter.metric = selected[0]
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


}

export default Filter;
