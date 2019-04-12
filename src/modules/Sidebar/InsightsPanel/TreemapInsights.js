import React, { Component } from 'react';

class TreemapInsights extends Component {
  qatarEmissionPerArea = () => {
    return (
      <li onClick={() => this.props.setFilters(["Central African Republic", "China", "France", "Germany", "Luxembourg", "Russian Federation", "Saudi Arabia", "South Africa", "Spain", "United States", "Qatar", "Liechtenstein"], 2014, false, false, this.props.metrics[4], this.props.emissionTypes[0])}>
        <div className="insight-name">Qatar emissions per area</div>
        <div>
          Qatar has considerably higher emissions per land area than a lot of other countries
        </div>
      </li>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.qatarEmissionPerArea()}
      </React.Fragment>
    );
  }
}

export default TreemapInsights;
