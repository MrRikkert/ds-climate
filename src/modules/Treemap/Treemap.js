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

    async transformData() {
        let data = this.props.getFilteredData()
            .map((d) => {
                let divider = this.props.getDivider(d)
                return {
                    name: d.country,
                    children: [
                        {
                            name: "Gas",
                            loc: this.divide(d.co2_gas_e, divider),
                            country: d.country
                        },
                        {
                            name: "liquid",
                            loc: this.divide(d.co2_liquid_e, divider),
                            country: d.country
                        },
                        {
                            name: "solid",
                            loc: this.divide(d.co2_solid_e, divider),
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
                label={this.getLabel}
                labelSkipSize={12}
                colorBy="name"
                animate={true}
                motionStiffness={200}
                motionDamping={20}
                leavesOnly={false} />
        );
    }
}

export default Treemap;
