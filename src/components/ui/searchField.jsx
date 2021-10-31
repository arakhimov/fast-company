import PropTypes from "prop-types";
import React from "react";

const SearchField = ({ name, value, placeholder, onChange }) => {
  return (
    <input
      type="search"
      className="form-control border-bottom w-100"
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
    />
  );
};

SearchField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default SearchField;
