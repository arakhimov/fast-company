import PropTypes from "prop-types";
import React from "react";
import CaretArrow from "../caretArrow";

const TableHeader = ({ currentSort, onSort, columns }) => {
  const handleSort = (item) => {
    if (currentSort.iterator === item) {
      onSort({
        ...currentSort,
        order: currentSort.order === "asc" ? "desc" : "asc"
      });
    } else {
      onSort({ iterator: item, order: "asc" });
    }
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            scope="col"
            role={columns[column].path && "button"}
          >
            {columns[column].name}
            {columns[column].path === currentSort.iterator && (
              <CaretArrow status={currentSort.order === "asc"} />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  currentSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  columns: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired
  ])
};

export default TableHeader;
