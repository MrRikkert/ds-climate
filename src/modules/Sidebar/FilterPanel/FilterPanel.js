import React, { Component } from 'react';
import { AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import AnimationToggle from "./AnimationToggle/AnimationToggle";
import CountrySelector from "./CountrySelector/CountrySelector";
import "./FilterPanel.css";
import MetricSelector from "./MetricSelector/MetricSelector";
import YaxisToggle from "./YaxisToggle/YaxisToggle";
import YearSelector from "./YearSelector/YearSelector";

class FilterPanel extends Component {
  state = {
    options: [],
  };

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
            <li>
              <li>Select countries:</li>
              <CountrySelector {...this.props} />
            </li>
            <li>
              <li>Select metric:</li>
              <MetricSelector {...this.props} />
            </li>
            <li>
              <li>Select year:</li>
              <YearSelector {...this.props} />
            </li>
            <li>
              <li>Toggle logarithmic y-scale:</li>
              <YaxisToggle {...this.props} />
            </li>
            <li>
              <li>Toggle animations:</li>
              <AnimationToggle {...this.props} />
            </li>
          </ul>
        </AccordionItemPanel>
      </AccordionItem>

    );
  }
}

export default FilterPanel;
