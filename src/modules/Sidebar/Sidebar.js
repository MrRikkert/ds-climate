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
                <Select
                    placeholder="Type to search"
                    multi
                    clearable
                    onChange={(values) => this.props.updateSelectedCountries(values)}
                    values={[]}
                    options={this.props.allCountries}
                />
                <label>
                    hallo
                    <input
                        type="checkbox"
                        name="Relative?"
                        checked={this.props.filter.relative}
                        onChange={this.props.setRelative} />
                </label>
            </div>
        );
    }
}

export default SideBar;
