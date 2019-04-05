import React, { Component } from 'react';
import "./FilterPanel.css"
import CountrySelector from "./CountrySelector/CountrySelector"
import YearSelector from "./YearSelector/YearSelector"
import MetricSelector from "./MetricSelector/MetricSelector"
import YaxisToggle from "./YaxisToggle/YaxisToggle"
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

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
                            <CountrySelector {...this.props} />
                        </li>
                        <li>
                            <MetricSelector {...this.props} />
                        </li>
                        <li>
                            <YearSelector {...this.props} />
                        </li>
                        <li>
                            <YaxisToggle {...this.props} />
                        </li>
                    </ul>
                </AccordionItemPanel>
            </AccordionItem>

        );
    }
}

export default FilterPanel;
