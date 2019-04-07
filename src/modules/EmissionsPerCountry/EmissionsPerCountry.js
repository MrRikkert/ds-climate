import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'
import "./EmissionsPerCountry.css"
import ColorHelper from "../../helpers/ColorHelper"
import CountrySelector from "../Sidebar/FilterPanel/CountrySelector/CountrySelector"
import AnimationToggle from "../Sidebar/FilterPanel/AnimationToggle/AnimationToggle"
import MetricSelector from "../Sidebar/FilterPanel/MetricSelector/MetricSelector"
import YaxisToggle from "../Sidebar/FilterPanel/YaxisToggle/YaxisToggle"

let yMax = 35000000
let yMin = 1
let yType = "linear";

class EmissionsPerCountry extends Component {
  state = {
    data: [{
      "id": "",
      "color": "",
      "data": [
        {
          "x": 0,
          "y": 0
        },
      ]
    }],
    filter: {},
  }

  async componentDidMount() {
    this.setState({
      filter: this.props.filter
    })
    this.transformData()
    this.props.setTitle("Total emissions per country (kt)")

    console.log(this.state.filter.filters)

    this.props.setAvailibleFilters([
      AnimationToggle,
      CountrySelector,
      MetricSelector,
      YaxisToggle
    ])
  }

  async componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        filter: this.props.filter
      })
      this.transformData()

      this.setYValues()
    }
  }

  setYValues = async () => {
    if (this.state.filter.log) {
      yType = "log"
      yMin = this.state.filter.metric.yMinLog
      yMax = this.state.filter.metric.yMaxLog
    } else {
      yType = "linear"
      yMin = "auto"
      yMax = "auto"
    }
  }

  getLabel = (node) => {
    return node.country + " (" + node.name + ")"
  }

  divide = (x, y) => {
    if (!y) {
      return 0
    }
    return x / y
  }

  getGroupedData = (items, key) => items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [
        ...(result[item[key]] || []),
        item,
      ],
    }),
    {},
  );

  transformData = async () => {
    let grouped = this.getGroupedData(this.props.getFilteredData(false), "country")

    let data = [];
    for (let country in grouped) {
      data.push({
        id: country,
        data: grouped[country]
          .map((d) => {
            let divider = this.props.getDivider(d)
            return {
              x: parseInt(d.year),
              y: this.divide(d.total_e, divider),
            }
          })
          .filter((d) => {
            return d.y > 0;
          })
      })
    }
    this.setState({
      data: data
    })
  }

  getColor = (d) => {
    return ColorHelper.getColorFromString(d.id)
  }

  render() {
    return (
      <div className="emission-line-graph">
        <ResponsiveLine
          curve="monotoneX"
          data={this.state.data}
          colors="set1"
          colorBy={this.getColor}
          animate={this.state.filter.animate}
          motionStiffness={200}
          motionDamping={20}
          enableGridY={false}
          margin={{
            "top": 15,
            "right": 10,
            "bottom": 80,
            "left": 90
          }}
          xScale={{
            "type": "linear",
            "min": 1970,
            "max": 2012,
          }}
          yScale={{
            "type": yType,
            "base": 10,
            "min": yMin,
            "max": yMax
          }}
          axisBottom={{
            "orient": "bottom",
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 90,
            "tickValues": 10,
            "legend": "Year",
            "legendOffset": 70,
            "legendPosition": "middle"
          }}
          axisLeft={{
            "orient": "left",
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "tickValues": 6,
          }} />
      </div>
    );
  }
}

export default EmissionsPerCountry;
