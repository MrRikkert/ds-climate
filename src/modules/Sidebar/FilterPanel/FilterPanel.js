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
              <ul>
                <li>Select countries:</li>
                <CountrySelector {...this.props} />
              </ul>
            </li>
            <li>
              <ul>
                <li>Select metric:</li>
                <MetricSelector {...this.props} />
              </ul>
            </li>
            <li>
              <ul>
                <li>Select year:</li>
                <YearSelector {...this.props} />
              </ul>
            </li>
            <li>
              <ul>
                <li>Toggle logarithmic y-scale:</li>
                <YaxisToggle {...this.props} />
              </ul>
            </li>
            <li>
              <ul>
                <li>Toggle animations:</li>
                <AnimationToggle {...this.props} />
              </ul>
            </li>
          </ul>
        </AccordionItemPanel>
      </AccordionItem>

    );
  }
}

export default FilterPanel;
