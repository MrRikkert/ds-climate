import React, { Component } from 'react';
import { ResponsiveLine } from 'nivo/es/components/charts/line'

class EmissionsAreaGraph extends Component {
    state = {
        data: [{
            "id": "japan",
            "color": "hsl(119, 70%, 50%)",
            "data": [
                {
                    "x": "plane",
                    "y": 16
                },
            ]
        }],
        filter: {}
    }

    componentDidMount() {
        this.setState({
            filter: this.props.filter
        })
        this.transformData()
        this.props.setTitle("CO2 emissions By fuel burned (kt)")
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                filter: this.props.filter
            })
            this.transformData()
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

    async transformData() {
        let grouped = this.getGroupedData(this.props.getFilteredData(false), "country")

        let data = [];
        for (let country in grouped) {
            data.push({
                id: country,
                data: grouped[country].map((d) => {
                    let divider = this.props.getDivider(d)
                    return {
                        x: parseInt(d.year),
                        y: this.divide(d.total_e, divider),
                    }
                })
            })
        }
        this.setState({
            data: data
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.data[0] ? (
                    <ResponsiveLine
                        data={this.state.data}
                        colors="nivo"
                        animate={true}
                        motionStiffness={200}
                        motionDamping={20}
                        margin={{
                            "top": 10,
                            "right": 10,
                            "bottom": 60,
                            "left": 60
                        }}
                        xScale={{
                            "type": "linear"
                        }}
                        yScale={{
                            "type": "linear",
                            "stacked": true,
                            "min": "auto",
                            "max": "auto"
                        }}
                        axisBottom={{
                            "orient": "bottom",
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": 90,
                            tickValues: [1960, 2012],
                            "legend": "transportation",
                            "legendOffset": 50,
                            "legendPosition": "center"
                        }}
                        axisLeft={{
                            "orient": "left",
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": 0,
                            "legend": "count",
                            "legendOffset": -40,
                            "legendPosition": "center"
                        }} />
                ) : (
                        <div>Please select a country</div>
                    )}
            </React.Fragment>
        );
    }
}

export default EmissionsAreaGraph;
