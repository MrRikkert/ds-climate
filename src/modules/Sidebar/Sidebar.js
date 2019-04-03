import React, { Component } from 'react';
import "./Sidebar.css"
import CountrySelector from "./CountrySelector/CountrySelector"
import YearSelector from "./YearSelector/YearSelector"
import MetricSelector from "./MetricSelector/MetricSelector"
import Collapsible from 'react-collapsible';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';

class SideBar extends Component {
    state = {
        options: [],
    };

    render() {
        return (
            <div className="sidenav">
                <Accordion allowZeroExpanded >
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                What harsh truths do you prefer to ignore?
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
                            </ul>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        );
    }
}

export default SideBar;
