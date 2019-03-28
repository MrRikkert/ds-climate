import React, { Component } from 'react';
import "./Sidebar.css"
import Select from "react-dropdown-select";

class SideBar extends Component {
    state = {
        options: []
    };

    componentDidMount() {
        this.setState({
            options: this.props.getCountries(this)
        })
    }

    render() {
        return (
            <div className="sidenav">
                <Select
                    placeholder="Type to search"
                    multi
                    clearable
                    onChange={() => undefined}
                    values={[]}
                    options={this.state.options}
                />
            </div>
        );
    }
}

export default SideBar;
