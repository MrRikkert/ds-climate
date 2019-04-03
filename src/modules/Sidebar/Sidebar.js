import React, { Component } from 'react';
import "./Sidebar.css"
import CountrySelector from "./CountrySelector/CountrySelector"
import YearSelector from "./YearSelector/YearSelector"
import MetricSelector from "./MetricSelector/MetricSelector"

class SideBar extends Component {
    state = {
        options: [],
    };

    render() {
        return (
            <div className="sidenav">
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
            </div>
        );
    }
}

export default SideBar;
