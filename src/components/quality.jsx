import PropTypes from "prop-types";
import React from "react";

const Quality = ({ color, name, _id }) => {
  return (
    <span className={`badge bg-${color} m-1`} key={_id}>
      {name}
    </span>
  );
};
Quality.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired
};

export default Quality;
