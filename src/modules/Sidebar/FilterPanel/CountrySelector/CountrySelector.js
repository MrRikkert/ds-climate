import React, { Component } from 'react';
import Select from 'react-select';
import "./CountrySelector.css"
import ColorHelper from '../../../../helpers/ColorHelper';

class CountrySelector extends Component {

  render() {
    return (
      <React.Fragment>
        <Select
          className="selectbox"
          placeholder="Type to search"
          isMulti
          clearable
          onChange={(values) => this.props.updateSelectedCountries(values)}
          options={this.props.allCountries}
          value={this.props.filter.countries}
          styles={{
            multiValue: (styles, { data }) => {
              return {
                ...styles,
                backgroundColor: data.color,
              }
            },
            multiValueLabel: (styles, { data }) => {
              return {
                ...styles,
                color: ColorHelper.getFontColor(data.color)

              }
            }
          }}
        />
      </React.Fragment>
    );
  }
}

export default CountrySelector;
