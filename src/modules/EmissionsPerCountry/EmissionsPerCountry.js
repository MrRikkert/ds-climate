import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'
import "./EmissionsPerCountry.css"
import ColorHelper from "../../helpers/ColorHelper"
import CountrySelector from "../Sidebar/FilterPanel/CountrySelector/CountrySelector"
import AnimationToggle from "../Sidebar/FilterPanel/AnimationToggle/AnimationToggle"
import MetricSelector from "../Sidebar/FilterPanel/MetricSelector/MetricSelector"
import LogAxisToggle from "../Sidebar/FilterPanel/LogAxisToggle/LogAxisToggle"
import EmissionTypeSelector from "../Sidebar/FilterPanel/EmissionTypeSelector/EmissionTypeSelector"

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
    yMax: 100,
    yMin: 1,
    yType: "linear",
  }

  async componentDidMount() {
    this.setState({
      filter: this.props.filter
    })
    this.transformData()
    this.props.setTitle("emissions per country (kt)")

    this.props.setAvailibleFilters([
      AnimationToggle,
      CountrySelector,
      MetricSelector,
      LogAxisToggle,
      EmissionTypeSelector
    ])
  }

  async componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      let yType = this.state.filter.yLog ? "log" : "linear"

      this.setState({
        filter: this.props.filter,
        yType: yType
      })
      this.transformData()
    }
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
    let min = Math.pow(10, 10);
    let max = 0;

    let data = [];
    for (let country in grouped) {
      data.push({
        id: country,
        data: grouped[country]
          // eslint-disable-next-line no-loop-func
          .map((d) => {
            let divider = this.props.getDivider(d)
            let metric = this.state.filter.emissionType ? this.state.filter.emissionType.value : 0

            let x = parseInt(d.year)
            let y = this.divide(d[metric], divider)

            if (y) {
              min = y < min ? y : min
              max = y > max ? y : max
            }

            return {
              x: x,
              y: y,
            }
          })
          .filter((d) => {
            return d.y > 0;
          })
      })
    }

    this.setState({
      data: data,
      yMax: max > min ? max : 10,
      yMin: min < max ? min : 1,
    })
  }

  render() {
    return (
      <div className="emission-line-graph">
        <ResponsiveLine
          curve="monotoneX"
          data={this.state.data}
          colors="set1"
          colorBy={(d) => ColorHelper.getColorFromString(d.id)}
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
            "type": this.state.yType,
            "base": 10,
            "min": this.state.yMin,
            "max": this.state.yMax
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
