import React, { Component } from 'react';
import "./RoutePanel.css"
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { NavLink } from "react-router-dom";

class RoutePanel extends Component {
    state = {
        options: [],
    };

    render() {
        return (
            <AccordionItem uuid={"route-list"}>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Graphs
                            </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <ul className="route-list">
                        <NavLink to="/treemap">
                            <li>CO2 emissions By fuel burned</li>
                        </NavLink>
                        <NavLink to="/treemap">
                            <li>link2</li>
                        </NavLink>
                        <NavLink to="/treemap">
                            <li>link3</li>
                        </NavLink>
                    </ul>
                </AccordionItemPanel>
            </AccordionItem>

        );
    }
}

export default RoutePanel;
