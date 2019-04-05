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
                        <NavLink activeClassName="route-active" to="/treemap">
                            <li>CO2 emissions By fuel burned</li>
                        </NavLink>
                        <NavLink activeClassName="route-active" to="/emission-per-country">
                            <li>Total emissions per country</li>
                        </NavLink>
                        <NavLink activeClassName="route-active" to="#">
                            <li>link3</li>
                        </NavLink>
                    </ul>
                </AccordionItemPanel>
            </AccordionItem>

        );
    }
}

export default RoutePanel;
