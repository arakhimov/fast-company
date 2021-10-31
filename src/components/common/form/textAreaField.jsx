import PropTypes from "prop-types";
import React from "react";

const TextAreaField = ({ label, name, value, onChange, error, rows }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-2">
      <label className="form-label mb-2" htmlFor={name}>
        {label}
      </label>
      <div className="input-group has-validation">
        <textarea
          rows={rows}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          autoComplete="off"
          className={`form-control ${error ? "is-invalid" : "is-valid"}`}
        />
        {error && <p className="invalid-feedback">{error}</p>}
      </div>
    </div>
  );
};

TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  rows: PropTypes.string
};

export default TextAreaField;
