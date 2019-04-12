import React, { Component } from 'react';
import { AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import "./InsightPanel.css";
import EmissionVsGdpInsights from "./EmissionVsGdpInsights"

class InsightsPanel extends Component {
  state = {
    options: [],
  };

  render() {
    return (
      <AccordionItem uuid={"insights"}>
        <AccordionItemHeading>
          <AccordionItemButton>
            Insights
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <ul className="insights-list">
            <EmissionVsGdpInsights {...this.props} />
          </ul>
        </AccordionItemPanel>
      </AccordionItem>
    );
  }
}

export default InsightsPanel;
