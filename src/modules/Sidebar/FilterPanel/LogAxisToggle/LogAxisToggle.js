import React, { Component } from 'react';
import Toggle from 'react-toggle'
import "./LogAxisToggle.css"

class LogAxisToggle extends Component {
  render() {
    return (
      <React.Fragment>
        <Toggle
          checked={this.props.axis === "y" ? this.props.filter.yLog : this.props.filter.xLog}
          aria-label='No label tag'
          onChange={() => this.props.toggleLog(this.props.axis)} />
      </React.Fragment>
    );
  }
}

export default LogAxisToggle;
