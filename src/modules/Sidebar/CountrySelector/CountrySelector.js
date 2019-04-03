import React, { Component } from 'react';
import Select from "react-dropdown-select";

class CountrySelector extends Component {

    render() {
        return (
            <React.Fragment>
                <Select
                    placeholder="Type to search"
                    multi
                    clearable
                    onChange={(values) => this.props.updateSelectedCountries(values)}
                    values={[]}
                    options={this.props.allCountries}
                />
            </React.Fragment>
        );
    }
}

export default CountrySelector;
