import React, { Component } from 'react';
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import "./EmissionsVsGdp.css"
import AnimationToggle from "../Sidebar/FilterPanel/AnimationToggle/AnimationToggle"
import MetricSelector from "../Sidebar/FilterPanel/MetricSelector/MetricSelector"
import EmissionTypeSelector from "../Sidebar/FilterPanel/EmissionTypeSelector/EmissionTypeSelector"

class EmissionVsGdp extends Component {
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
    xMin: 1,
    xMax: 1000,
    yType: "linear",
    xType: "linear"
  }

  async componentDidMount() {
    this.setState({
      filter: this.props.filter
    })
    this.transformData()
    this.props.setTitle("emissions per country (kt)")

    this.props.setAvailibleFilters([
      AnimationToggle.name,
      MetricSelector.name,
      "LogAxisToggleX",
      "LogAxisToggleY",
      EmissionTypeSelector.name
    ])
  }

  async componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      let yType = this.state.filter.yLog ? "log" : "linear"
      let xType = this.state.filter.xLog ? "log" : "linear"

      this.setState({
        filter: this.props.filter,
        yType: yType,
        xType: xType,
        xMin: this.state.filter.xLog ? 50 : 0
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
    let grouped = this.getGroupedData(this.props.getFilteredData(true, false), "country")
    let yMin = Math.pow(10, 10);
    let yMax = 0;

    let data = [];
    for (let country in grouped) {
      data
        .push({
          id: country,
          data: grouped[country]
            .filter((d) => {
              if (d.gdp_pc) {
                return true
              }
              return false
            })
            // eslint-disable-next-line no-loop-func
            .map((d) => {
              let divider = this.props.getDivider(d)
              let metric = this.state.filter.emissionType ? this.state.filter.emissionType.value : 0

              let x = d.gdp_pc
              let y = this.divide(d[metric], divider)

              if (y) {
                yMin = y < yMin ? y : yMin
                yMax = y > yMax ? y : yMax
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
      yMax: yMax > yMin ? 1000000 : 10,
      yMin: yMin < yMax ? yMin : 1,
    })
  }

  render() {
    return (
      <div className="emission-line-graph">
        <ResponsiveScatterPlot
          curve="monotoneX"
          data={this.state.data}
          colors="set1"
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
            "base": 10,
            "type": this.state.xType,
            "min": this.state.xMin,
            "max": this.state.xMax,
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
            "tickValues": 5,
          }} />
      </div>
    );
  }
}

export default EmissionVsGdp;
