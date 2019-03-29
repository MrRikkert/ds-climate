import React, { Component } from 'react';
import { ResponsiveTreeMap } from 'nivo/es/components/charts/treemap'

class Treemap extends Component {
    state = {
        data: {},
        filter: {}
    }

    componentDidMount() {
        this.setState({
            filter: this.props.filter
        })
        this.transformData()
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

    async transformData() {
        let relative = this.state.filter.relative
        let data = this.props.getFilteredData()
            .map((d) => {
                return {
                    name: d.country,
                    children: [
                        {
                            name: "Gas",
                            loc: relative ? d.co2_gas_e / d.population : d.co2_gas_e,
                            country: d.country
                        },
                        {
                            name: "liquid",
                            loc: relative ? d.co2_liquid_e / d.population : d.co2_liquid_e,
                            country: d.country
                        },
                        {
                            name: "solid",
                            loc: relative ? d.co2_solid_e / d.population : d.co2_solid_e,
                            country: d.country
                        },
                    ]
                }
            })
        data = {
            name: "world",
            children: data
        }
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
                    "top": 20,
                    "right": 0,
                    "bottom": 20,
                    "left": 20
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
