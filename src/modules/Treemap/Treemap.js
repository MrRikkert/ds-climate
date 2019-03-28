import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ResponsiveTreeMap } from 'nivo/es/components/charts/treemap'

class Treemap extends Component {
    state = {
        data: {}
    }

    componentDidMount() {
        this.props.getData(this, this.transformData)
    }

    getColor = (node) => {
        return "nivo"
    }

    getLabel = (node) => {
        return node.country + " (" + node.name + ")"
    }

    transformData = () => {
        let data = this.state.fullData
            .filter((d) => {
                if (parseInt(d.year) === 2012 && (d.country === "Netherlands" || d.country === "Belgium")) {
                    return true
                }
                return false
            })
            .map((d) => {
                return {
                    name: d.country,
                    children: [
                        {
                            name: "Gas",
                            loc: d.co2_gas_e,
                            country: d.country
                        },
                        {
                            name: "liquid",
                            loc: d.co2_liquid_e,
                            country: d.country
                        },
                        {
                            name: "solid",
                            loc: d.co2_solid_e,
                            country: d.country
                        },
                    ]
                }
            })
        data = {
            name: "world",
            children: data
        }
        console.log(data)
        this.setState({
            data: data
        })
    }

    render() {
        return (
            <ResponsiveTreeMap
                root={this.state.data}
                value="loc"
                identity="name"
                colors="nivo"
                innerPadding={10}
                outerPadding={3}
                margin={{
                    "top": 10,
                    "right": 10,
                    "bottom": 10,
                    "left": 10
                }}
                label={this.getLabel}
                labelSkipSize={12}
                colorBy="name"
                animate={true}
                motionStiffness={90}
                motionDamping={11}
                leavesOnly={false} />
        );
    }
}

export default Treemap;
