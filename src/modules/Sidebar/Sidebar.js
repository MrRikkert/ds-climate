import React, { Component } from 'react';
import "./Sidebar.css"
import Select from "react-dropdown-select";

class SideBar extends Component {
    state = {
        options: [],
        updates: 0
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
                            Relative?
                        <input
                                type="checkbox"
                                name="Relative?"
                                checked={this.props.filter.relative}
                                onChange={this.props.setRelative} />
                        </label>
                    </li>
                    <li>
                        <input
                            type="range"
                            min="1970"
                            max="2013"
                            defaultValue={this.props.filter.year}
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
