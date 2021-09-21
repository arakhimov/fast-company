import PropTypes from "prop-types";
import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ onSort, currentSort, columns, data, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader {...{ onSort, currentSort, columns }} />
          <TableBody {...{ data, columns }} />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  onSort: PropTypes.func,
  currentSort: PropTypes.object,
  columns: PropTypes.object,
  data: PropTypes.array,
  children: PropTypes.array
};

export default Table;
