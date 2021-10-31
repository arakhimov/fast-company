import PropTypes from "prop-types";
import React from "react";

const RadioField = ({ options, label, onChange, value, name }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-3">
      <p className="form-check-label mb-1" htmlFor="inlineRadio1">
        {label}
      </p>
      {options.map((option) => (
        <div
          key={`${option.name}_${option.value}`}
          className="form-check form-check-inline"
        >
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={`${option.name}_${option.value}`}
            value={option.value}
            onChange={handleChange}
            checked={option.value === value}
          />
          <label
            className="form-check-label"
            htmlFor={`${option.name}_${option.value}`}
          >
            {option.value}
          </label>
        </div>
      ))}
    </div>
  );
};

RadioField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func
};

export default RadioField;
