import PropTypes from "prop-types";
import React from "react";

const PaginationItem = ({ number, currentPage, onPageChange }) => {
  const getClassName = () => {
    return `page-item${number === currentPage ? " active" : ""}`;
  };

  const handlePageChange = (event) => {
    event.preventDefault();
    onPageChange(number);
  };

  return (
    <li className={getClassName()} aria-current="page">
      <a className="page-link" href="/" onClick={handlePageChange}>
        {number}
      </a>
    </li>
  );
};

PaginationItem.propTypes = {
  number: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default PaginationItem;
