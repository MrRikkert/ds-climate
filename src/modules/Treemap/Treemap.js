import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TreeMap } from 'nivo/es/components/charts/treemap'

class Treemap extends Component {
    state = {
        data: {}
    }

    componentDidMount() {
        this.props.getData(this, this.transformData)
    }

    getColor = (node) => {
        console.log(node)
        return "hsl(10, 70%, 50%)"
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
                            loc: d.co2_gas_e
                        },
                        {
                            name: "liquid",
                            loc: d.co2_liquid_e
                        },
                        {
                            name: "solid",
                            loc: d.co2_solid_e
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
            <TreeMap
                root={this.state.data}
                width={1000}
                height={600}
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
                label="loc"
                labelFormat=".0s"
                labelSkipSize={12}
                colorBy="name"
                animate={true}
                motionStiffness={90}
                motionDamping={11}
                leavesOnly={true} />
        );
    }
}

export default Treemap;
