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

    getDivider(row) {
        switch (this.state.filter.metric.value) {
            case 1:
                return 1;
            case 2:
                return row.population
            default:
                return 1;
        }
    }

    async transformData() {
        let data = this.props.getFilteredData()
            .map((d) => {
                let divider = this.getDivider(d)
                return {
                    name: d.country,
                    children: [
                        {
                            name: "Gas",
                            loc: d.co2_gas_e / divider,
                            country: d.country
                        },
                        {
                            name: "liquid",
                            loc: d.co2_liquid_e / divider,
                            country: d.country
                        },
                        {
                            name: "solid",
                            loc: d.co2_solid_e / divider,
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
