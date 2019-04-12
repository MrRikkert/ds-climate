import React, { Component } from 'react';

class EmissionVsGdpInsights extends Component {
  spainInsight = () => {
    return (
      <li onClick={() => this.props.setFilters(["Spain"], 2014, false, false, this.props.metrics[0], this.props.emissionTypes[0])}>
        <div className="insight-name">2007 Spanish economic crisis</div>
        <div>
          The huge drop in emissions in 2007 was caused by the <a href="https://en.wikipedia.org/wiki/Financial_crisis_of_2007%E2%80%932008" target="_blank" rel="noopener noreferrer">2007 financial crisis</a> and <a href="https://en.wikipedia.org/wiki/2008%E2%80%932014_Spanish_financial_crisis" target="_blank" rel="noopener noreferrer">2008 spanish financial crisis</a>
        </div>
      </li>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.spainInsight()}
      </React.Fragment>
    );
  }
}

export default EmissionVsGdpInsights;
