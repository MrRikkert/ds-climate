import React, { Component } from 'react';
import "./Sidebar.css"
import Select from "react-dropdown-select";

class SideBar extends Component {
    state = {
        options: [],
    };

    render() {
        return (
            <div className="sidenav">
                <ul className="filters-list">
                    <li>
                        <Select
                            placeholder="Type to search"
                            multi
                            clearable
                            onChange={(values) => this.props.updateSelectedCountries(values)}
                            values={[]}
                            options={this.props.allCountries}
                        />
                    </li>
                    <li>
                        <label>
                            Relative? (divide by population)
                        <input
                                type="checkbox"
                                name="Relative?"
                                checked={this.props.filter.relative}
                                onChange={this.props.setRelative} />
                        </label>
                    </li>
                    <li>
                        <button onClick={this.props.ToggleYearTimer}>Toggle timer</button>
                        <input
                            type="range"
                            min="1970"
                            max="2014"
                            value={this.props.filter.year}
                            step="1"
                            onChange={this.props.changeYear} />
                        <label>{this.props.filter.year}</label>
                    </li>
                </ul>
            </div>
        );
    }
}

export default SideBar;
