import React from "react";
import { USERS_PER_PAGE } from "../constants/constants";
import PaginationItem from "./paginationItem";

const Pagination = ({ users, ...rest }) => {
  const pages = [];

  const pagesAmount = Math.ceil(users.length / USERS_PER_PAGE);

  for (let i = 1; i <= pagesAmount; i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="...">
      <ul className="pagination">
        {pages.map(page => (
          <PaginationItem key={page} number={page} {...rest} />
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
