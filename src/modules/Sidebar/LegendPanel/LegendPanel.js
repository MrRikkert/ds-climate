import React, { Component } from 'react';
import "./LegendPanel.css"
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { NavLink } from "react-router-dom";

class LegendPanel extends Component {

    render() {
        return (
            <AccordionItem uuid={"legend"}>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Legend
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <ul className="legend-list">
                        {this.props.filter.countries.map((c) => {
                            return (
                                <React.Fragment>
                                    <li>
                                        <span className="legend-color" style={{ backgroundColor: c.color }}></span>
                                        {c.country}
                                    </li>
                                </React.Fragment>
                            )
                        })}
                    </ul>
                </AccordionItemPanel>
            </AccordionItem>

        );
    }
}

export default LegendPanel;
