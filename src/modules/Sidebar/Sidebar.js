import React, { Component } from 'react';
import "./Sidebar.css"
import FilterPanel from "./FilterPanel/FilterPanel";
import {
    Accordion,
} from 'react-accessible-accordion';
import RoutePanel from "./RoutePanel/RoutePanel"

import 'react-accessible-accordion/dist/fancy-example.css';

class SideBar extends Component {
    state = {
        options: [],
    };

    render() {
        return (
            <div className="sidenav">
                <Accordion allowZeroExpanded allowMultipleExpanded preExpanded={["filters-list"]} >
                    <FilterPanel {...this.props} />
                    <RoutePanel {...this.props} />
                </Accordion>
            </div>
        );
    }
}

export default SideBar;
