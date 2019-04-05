import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'

class EmissionsAreaGraph extends Component {
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
                data: grouped[country]
                    .map((d) => {
                        let divider = this.props.getDivider(d)
                        console.log(this.divide(d.total_e, divider))
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

    render() {
        return (
            <React.Fragment>
                <ResponsiveLine
                    curve="monotoneX"
                    data={this.state.data}
                    colors="nivo"
                    animate={true}
                    motionStiffness={200}
                    motionDamping={20}
                    enableGridY={false}
                    margin={{
                        "top": 10,
                        "right": 10,
                        "bottom": 60,
                        "left": 70
                    }}
                    xScale={{
                        "type": "linear",
                        "min": 1970,
                        "max": 2012,
                    }}
                    yScale={{
                        "type": "log",
                        "base": 10,
                        "min": 1,
                        "max": 35000000
                    }}
                    axisBottom={{
                        "orient": "bottom",
                        "tickSize": 5,
                        "tickPadding": 5,
                        "tickRotation": 90,
                        "tickValues": 10,
                        "legend": "Year",
                        "legendOffset": 50,
                        "legendPosition": "middle"
                    }}
                    axisLeft={{
                        "orient": "left",
                        "tickSize": 5,
                        "tickPadding": 5,
                        "tickRotation": 0,
                        "tickValues": 6,
                    }} />
            </React.Fragment>
        );
    }
}

export default EmissionsAreaGraph;
