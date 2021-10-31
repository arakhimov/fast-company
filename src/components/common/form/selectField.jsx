/* eslint-disable indent */
import PropTypes from "prop-types";
import React from "react";

const SelectField = ({
  label,
  onChange,
  options,
  defaultValue,
  value,
  name,
  error
}) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          _id: options[optionName]._id,
          name: options[optionName].name
        }))
      : options;

  const handleChange = ({ target }) => {
    onChange({
      name: target.name,
      value: optionsArray.find((item) => item.name === target.value)
    });
  };

  return (
    <div className="mb-3">
      <label htmlFor="selected-prof" className="form-label">
        {label}
      </label>
      <select
        name={name}
        className={`form-select ${error ? "is-invalid" : "is-valid"}`}
        id="selected-prof"
        onChange={handleChange}
        value={value}
      >
        <option selected disabled value="">
          {defaultValue}
        </option>
        {optionsArray &&
          optionsArray.map((optionName) => (
            <option
              key={optionName._id}
              value={optionName.name}
              data-asd={optionName._id}
            >
              {optionName.name}
            </option>
          ))}
      </select>
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

SelectField.defaultProps = {
  defaultValue: ""
};

SelectField.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string
};

export default SelectField;
