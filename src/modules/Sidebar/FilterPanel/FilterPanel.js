import React, { Component } from 'react';
import "./FilterPanel.css"
import CountrySelector from "./CountrySelector/CountrySelector"
import YearSelector from "./YearSelector/YearSelector"
import MetricSelector from "./MetricSelector/MetricSelector"

class FilterPanel extends Component {
    state = {
        options: [],
    };

    render() {
        return (
            <ul className="filters-list">
                <li>
                    <CountrySelector {...this.props} />
                </li>
                <li>
                    <MetricSelector {...this.props} />
                </li>
                <li>
                    <YearSelector {...this.props} />
                </li>
            </ul>
        );
    }
}

export default FilterPanel;
