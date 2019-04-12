import React, { Component } from 'react';
import { AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import "./InsightPanel.css";
import EmissionVsGdpInsights from "./EmissionVsGdpInsights"
import TreemapInsights from "./TreemapInsights"
import { withRouter } from 'react-router-dom';

class InsightsPanel extends Component {
  state = {
    options: [],
  };

  render() {
    let path = this.props.location.pathname
    return (
      <AccordionItem uuid={"insights"}>
        <AccordionItemHeading>
          <AccordionItemButton>
            Insights
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <ul className="insights-list">
            {path === "/emission-per-country" && <EmissionVsGdpInsights {...this.props} />}
            {path === "/treemap" && <TreemapInsights {...this.props} />}
          </ul>
        </AccordionItemPanel>
      </AccordionItem>
    );
  }
}

export default withRouter(InsightsPanel);
