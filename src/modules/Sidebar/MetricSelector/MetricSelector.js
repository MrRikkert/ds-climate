import React, { Component } from 'react';

class MetricSelector extends Component {

    render() {
        return (
            <React.Fragment>
                <label>
                    Relative? (divide by population)
                        <input
                        type="checkbox"
                        name="Relative?"
                        checked={this.props.filter.relative}
                        onChange={this.props.setRelative} />
                </label>
            </React.Fragment>
        );
    }
}

export default MetricSelector;
