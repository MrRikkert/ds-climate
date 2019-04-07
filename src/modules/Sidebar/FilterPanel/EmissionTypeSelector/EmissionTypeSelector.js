import React, { Component } from 'react';
import Select from 'react-select';

class EmissionTypeSelector extends Component {
  render() {
    return (
      <React.Fragment>
        <Select
          searchable={false}
          onChange={(values) => this.props.updateSelectedEmissionType(values)}
          options={this.props.emissionTypes}
          value={this.props.filter.emissionType}
        />
      </React.Fragment>
    );
  }
}

export default EmissionTypeSelector;
