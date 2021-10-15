import PropTypes from "prop-types";
import React, { useState } from "react";

const TextField = ({ label, type, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((prevState) => !prevState);

  return (
    <div className="mb-4">
      <label className="form-label mb-2" htmlFor={name}>
        {label}
      </label>
      <div className="input-group has-validation">
        <input
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete="off"
          className={`form-control ${error ? "is-invalid" : "is-valid"}`}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleShowPassword}
          >
            <i className={`bi bi-eye${showPassword ? "" : "-slash"}`}></i>
          </button>
        )}
        {error && <p className="invalid-feedback">{error}</p>}
      </div>
    </div>
  );
};

TextField.defaultProps = { type: "text" };

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default TextField;
