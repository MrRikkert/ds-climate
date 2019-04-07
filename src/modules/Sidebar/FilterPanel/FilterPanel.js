import React, { Component } from 'react';
import { AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import AnimationToggle from "./AnimationToggle/AnimationToggle";
import CountrySelector from "./CountrySelector/CountrySelector";
import "./FilterPanel.css";
import MetricSelector from "./MetricSelector/MetricSelector";
import YaxisToggle from "./YaxisToggle/YaxisToggle";
import YearSelector from "./YearSelector/YearSelector";
import EmissionTypeSelector from "./EmissionTypeSelector/EmissionTypeSelector";

class FilterPanel extends Component {
  state = {
    options: [],
  };

  getListItem = (label, filter) => {
    let show = this.props.selectedFilters.indexOf(filter.type.name) > -1
    return (
      <li className={show ? "" : "hidden"}>
        <ul>
          <li>{label}:</li>
          {filter}
        </ul>
      </li>
    )
  }

  render() {
    return (
      <AccordionItem uuid={"filters-list"}>
        <AccordionItemHeading>
          <AccordionItemButton>
            Filters
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <ul className="filters-list">
            {this.getListItem("Select countries", <CountrySelector {...this.props} />)}
            {this.getListItem("Select metric", <MetricSelector {...this.props} />)}
            {this.getListItem("Select emission type", <EmissionTypeSelector {...this.props} />)}
            {this.getListItem("Select year", <YearSelector {...this.props} />)}
            {this.getListItem("Toggle logarithmic y-scale", <YaxisToggle {...this.props} />)}
            {this.getListItem("Toggle animations", <AnimationToggle {...this.props} />)}
          </ul>
        </AccordionItemPanel>
      </AccordionItem>

    );
  }
}

export default FilterPanel;
