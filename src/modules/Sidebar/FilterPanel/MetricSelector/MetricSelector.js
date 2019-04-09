import React, { Component } from 'react';
import Select from 'react-select';

class MetricSelector extends Component {
  render() {
    return (
      <React.Fragment>
        <Select
          isSearchable={false}
          placeholder="Type to search"
          onChange={(values) => this.props.updateSelectedMetric(values)}
          options={this.props.metrics}
          value={this.props.filter.metric}
        />
      </React.Fragment>
    );
  }
}

export default MetricSelector;
