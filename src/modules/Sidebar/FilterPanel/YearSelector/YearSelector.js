import React, { Component } from 'react';

class YearSelector extends Component {

    render() {
        return (
            <React.Fragment>
                <button onClick={this.props.ToggleYearTimer}>Toggle timer</button>
                <input
                    type="range"
                    min="1970"
                    max="2014"
                    value={this.props.filter.year}
                    step="1"
                    onChange={this.props.changeYear} />
                <label>{this.props.filter.year}</label>
            </React.Fragment>
        );
    }
}

export default YearSelector;
