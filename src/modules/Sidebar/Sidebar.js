import React, { Component } from 'react';
import "./Sidebar.css"
import FilterPanel from "./FilterPanel/FilterPanel";
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
                <Accordion allowZeroExpanded preExpanded={["1"]} >
                    <AccordionItem uuid={"1"}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Filters
                    </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <FilterPanel {...this.props} />
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
            </div>
        );
    }
}

export default SideBar;
