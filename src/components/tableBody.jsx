import { get } from "lodash";
import PropTypes from "prop-types";
import React from "react";

const TableBody = ({ data, columns }) => {
  const renderContent = (item, column) => {
    const component = columns[column].component;
    if (component) {
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    return get(item, columns[column].path);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column) => {
            return <td key={column}>{renderContent(item, column)}</td>;
          })}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableBody;
