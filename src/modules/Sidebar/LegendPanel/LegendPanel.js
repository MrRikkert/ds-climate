import React, { Component } from 'react';
import { AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import "./LegendPanel.css";

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
                <React.Fragment key={c.country}>
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
