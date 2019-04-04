import React, { Component } from 'react';
import "./YearSelecotr.css"

class YearSelector extends Component {

    render() {
        return (
            <React.Fragment>
                <button className="toggle-timer" onClick={this.props.ToggleYearTimer}>{this.props.animating ? "Stop" : "Start"}</button>
                <input
                    className="year-slider"
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
