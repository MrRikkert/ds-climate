import React, { Component } from 'react';
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import "./EmissionsVsGdp.css"
import AnimationToggle from "../Sidebar/FilterPanel/AnimationToggle/AnimationToggle"
import MetricSelector from "../Sidebar/FilterPanel/MetricSelector/MetricSelector"
import EmissionTypeSelector from "../Sidebar/FilterPanel/EmissionTypeSelector/EmissionTypeSelector"
import YearSelector from "../Sidebar/FilterPanel/YearSelector/YearSelector"

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
    xMax: 18000000000000,
    yType: "linear",
    xType: "linear",
    xValues: [],
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
      EmissionTypeSelector.name,
      YearSelector.name
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
        xMin: this.state.filter.xLog ? 50 : 0,
        xValues: this.state.filter.xLog ? ["1e+2", "1e+4", "1e+6", "1e+8", "1e+10", "1e+12", "1e+14"] : ["0", "2e+12", "4e+12", "6e+12", "8e+12", "10e+12", "12e+12", "14e+12", "16e+12", "18e+12"]
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

              let x = d.gdp
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
      yMax: yMax > yMin ? 10500000 : 10,
      yMin: yMin < yMax ? yMin : 1,
    })
  }

  getColor = () => {
    return "#3498DB"
  }

  getToolTip = (d) => {
    return (
      <div className="evg-tooltip">
        <div className="country-name">{d.serie.id}</div>
        <table>
          <tbody>
            <tr>
              <td>GDP: </td>
              <td>{parseFloat(d.x).toExponential(2)}</td>
            </tr>
            <tr>
              <td>Emissions: </td>
              <td>{parseFloat(d.y).toExponential(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    return (
      <div className="emission-line-graph">
        <ResponsiveScatterPlot
          symbolSize={10}
          curve="monotoneX"
          data={this.state.data}
          colors="set1"
          colorBy={this.getColor}
          animate={this.state.filter.animate}
          motionStiffness={200}
          motionDamping={20}
          enableGridY={false}
          tooltip={this.getToolTip}
          margin={{
            "top": 15,
            "right": 30,
            "bottom": 60,
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
            "tickPadding": 20,
            "tickRotation": 0,
            "tickValues": this.state.xValues,
            "legend": "GDP",
            "legendOffset": 50,
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
