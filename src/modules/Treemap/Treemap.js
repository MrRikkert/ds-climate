import React, { Component } from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap'
import ColorHelper from '../../helpers/ColorHelper';
import "./Treemap.css"

class Treemap extends Component {
    state = {
        data: {},
        filter: {}
    }

    async componentDidMount() {
        this.setState({
            filter: this.props.filter
        })
        this.transformData()
        this.props.setTitle("CO2 emissions By fuel burned (kt)")
    }

    async componentDidUpdate(prevProps) {
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

    transformData = async () => {
        let data = this.props.getFilteredData()
            .map((d) => {
                let divider = this.props.getDivider(d)
                return {
                    name: d.country,
                    children: [
                        {
                            id: 1,
                            name: "Gas",
                            loc: this.divide(d.co2_gas_e, divider),
                            country: d.country
                        },
                        {
                            id: 2,
                            name: "liquid",
                            loc: this.divide(d.co2_liquid_e, divider),
                            country: d.country
                        },
                        {
                            id: 3,
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

    getColor = (d) => {
        let color
        if (d.country) {
            color = ColorHelper.getColorFromString(d.country)
            switch (d.id) {
                case 1:
                    color = ColorHelper.shadeColor(color, 0.1)
                    break;
                case 2:
                    color = ColorHelper.shadeColor(color, 0.3)
                    break;
                case 3:
                    color = ColorHelper.shadeColor(color, 0.5)
                    break;
                default:
                    break;
            }
        } else {
            color = ColorHelper.getColorFromString(d.name)
        }
        return color
    }

    render() {
        return (
            <div className="emission-treemap">
                <ResponsiveTreeMap
                    root={this.state.data}
                    value="loc"
                    identity="name"
                    colors="set3"
                    label={this.getLabel}
                    labelSkipSize={35}
                    colorBy={this.getColor}
                    animate={true}
                    motionStiffness={200}
                    motionDamping={20}
                    leavesOnly={false} />
            </div>
        );
    }
}

export default Treemap;
