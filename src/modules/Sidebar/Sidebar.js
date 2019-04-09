import React, { Component } from 'react';
import "./Sidebar.css"
import FilterPanel from "./FilterPanel/FilterPanel";
import {
  Accordion,
} from 'react-accessible-accordion';
import RoutePanel from "./RoutePanel/RoutePanel"
import LegendPanel from "./LegendPanel/LegendPanel"

import 'react-accessible-accordion/dist/fancy-example.css';

class SideBar extends Component {
  state = {
    options: [],
  };

  render() {
    return (
      <div className="sidenav">
        <div className="title">{this.props.title}</div>
        <Accordion allowZeroExpanded allowMultipleExpanded preExpanded={["filters-list", "legend"]} >
          <RoutePanel {...this.props} />
          <FilterPanel {...this.props} />
          <LegendPanel {...this.props} />
        </Accordion>
      </div>
    );
  }
}

export default SideBar;
