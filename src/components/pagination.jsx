import PropTypes from "prop-types";
import React from "react";
import { USERS_PER_PAGE } from "../constants/constants";

const Pagination = ({ usersAmount, currentPage, onPageChange }) => {
  const pagesAmount = Math.ceil(usersAmount / USERS_PER_PAGE);
  const pages = new Array(pagesAmount).fill(null).map((_, ind) => ind + 1);

  return (
    <nav aria-label="...">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={"page-item " + (page === currentPage ? "active" : "")}
            aria-current="page"
          >
            <a className="page-link btn" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  usersAmount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
