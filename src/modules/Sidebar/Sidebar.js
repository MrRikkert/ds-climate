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
                            hallo
                    <input
                                type="checkbox"
                                name="Relative?"
                                checked={this.props.filter.relative}
                                onChange={this.props.setRelative} />
                        </label>
                    </li>
                    <li>
                        <input id="typeinp" type="range" min="1970" max="2013" defaultValue="2013" step="1" />
                    </li>
                </ul>
            </div>
        );
    }
}

export default SideBar;
