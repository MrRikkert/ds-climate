import React, { Component } from 'react';
import Select from "react-dropdown-select";

class MetricSelector extends Component {
    render() {
        return (
            <React.Fragment>
                <Select
                    searchable={false}
                    placeholder="Type to search"
                    onChange={(values) => this.props.updateSelectedMetric(values)}
                    options={this.props.metrics}
                    values={[this.props.filter.metric]}
                />
            </React.Fragment>
        );
    }
}

export default MetricSelector;
