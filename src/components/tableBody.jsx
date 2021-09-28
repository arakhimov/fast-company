import { get } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const TableBody = ({ data, columns }) => {
  const renderContent = (item, column) => {
    const component = columns[column].component;
    if (component) {
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    if (column === "name") {
      return (
        <Link to={`/users/${item._id}`}>{get(item, columns[column].path)}</Link>
      );
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
