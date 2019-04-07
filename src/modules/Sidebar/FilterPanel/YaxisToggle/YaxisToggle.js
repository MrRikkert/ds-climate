import React, { Component } from 'react';
import Toggle from 'react-toggle'
import "./YaxisToggle.css"

class YaxisToggle extends Component {
  render() {
    return (
      <React.Fragment>
        <Toggle
          checked={this.props.filter.log}
          aria-label='No label tag'
          onChange={this.props.toggleLog} />
      </React.Fragment>
    );
  }
}

export default YaxisToggle;
