import React, { useState } from "react";
import api from "./API";
import Pagination from "./components/pagination";
import SearchStatus from "./components/searchStatus";
import Users from "./components/users";
import { USERS_PER_PAGE } from "./constants/constants";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = id => {
    setUsers(users.filter(user => user._id !== id));
  };

  const handleLikesToggle = id => {
    const newUsers = [...users];
    const elementIndex = users.findIndex(user => user._id === id);
    newUsers[elementIndex].status = !newUsers[elementIndex].status;
    setUsers(newUsers);
  };

  const handlePageChange = number => {
    setCurrentPage(number);
  };

  const getCurrentPageUsers = () => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endEndex = startIndex + USERS_PER_PAGE;
    return users.slice(startIndex, endEndex);
  };

  return (
    <>
      <SearchStatus length={users.length} />
      <Users users={getCurrentPageUsers()} onDelete={handleDelete} onLikesToggle={handleLikesToggle} />
      <Pagination users={users} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
};

export default App;
