import React, { Component } from 'react';
import Select, { components } from 'react-select';
import "./CountrySelector.css"
import ColorHelper from '../../../../helpers/ColorHelper';

const MultiValueContainer = (props) => {
  return (
    <div>
      <span>hallo</span>
    </div>
  );
};

const ValueContainer = ({ children, ...props }) => (
  <components.ValueContainer {...props}>
    {children[0].length > 0 &&
      <span>Selected countries: {children[0].length}</span>
    }
    {children}
  </components.ValueContainer>
);

class CountrySelector extends Component {

  render() {
    return (
      <React.Fragment>
        <Select
          hideSelectedOptions={false}
          className="selectbox"
          placeholder="Type to search"
          isMulti
          clearable
          components={{ ValueContainer }}
          onChange={(values) => this.props.updateSelectedCountries(values)}
          options={this.props.allCountries}
          value={this.props.filter.countries}
          styles={{
            multiValue: (styles, { data }) => {
              return {
                ...styles,
                display: "none",
                backgroundColor: data.color,
                flexShrink: 0,
              }
            },
            multiValueLabel: (styles, { data }) => {
              return {
                ...styles,
                color: ColorHelper.getFontColor(data.color)

              }
            },
            valueContainer: (styles, { data }) => {
              return {
                ...styles,
                flexWrap: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis"
              }
            },
          }}
        />
      </React.Fragment>
    );
  }
}

export default CountrySelector;
