/* eslint-disable indent */
import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          value: options[optionName]._id,
          label: options[optionName].name
        }))
      : options;

  const handleChange = (value) => {
    // onChange({
    //   name: name,
    //   value: value
    //     .map((item) =>
    //       Object.values(options).find(({ name }) => name === item.label)
    //     )
    //     .flat()
    // });
    onChange({ name, value: value.map((q) => q.value) });
  };

  return (
    <div className="mb-3">
      <label className="form-check-label mb-2" htmlFor="inlineRadio1">
        {label}
      </label>
      {optionsArray && (
        <Select
          defaultValue={
            defaultValue &&
            optionsArray.filter((quality) =>
              defaultValue.some((item) => item._id === quality.value)
            )
          }
          className="basic-multi-select"
          classNamePrefix="select"
          options={optionsArray}
          name={name}
          onChange={handleChange}
          isMulti
        />
      )}
    </div>
  );
};

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string
};

export default MultiSelectField;
