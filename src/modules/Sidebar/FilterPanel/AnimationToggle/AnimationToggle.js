import React, { Component } from 'react';
import Toggle from 'react-toggle'
import "./AnimationToggle.css"

class AnimationToggle extends Component {
  render() {
    return (
      <React.Fragment>
        <Toggle
          checked={this.props.filter.animate}
          aria-label='No label tag'
          onChange={this.props.toggleAnimations} />
      </React.Fragment>
    );
  }
}

export default AnimationToggle;
