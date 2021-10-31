/* eslint-disable indent */
import { orderBy } from "lodash";
import React, { useEffect, useState } from "react";
import api from "../../../API";
import { USERS_PER_PAGE } from "../../../constants/constants";
import GroupList from "../../common/groupList";
import Pagination from "../../common/pagination";
import SearchField from "../../ui/searchField";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [professions, setProfessions] = useState();
  const [sortBy, setSortBy] = useState({ iterator: "name", order: "asc" });

  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  const [searchField, setSearchField] = useState("");
  const [foundUsers, setFoundUsers] = useState();

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  const handleLikesToggle = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handlePfofessionSelect = (item) => {
    setSelectedProf(item);
    setSearchField("");
  };

  const handleClearFilter = () => {
    setSelectedProf(null);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleChangeSearch = ({ target }) => {
    setSearchField(target.value);
    setFoundUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(target.value.toLowerCase())
      )
    );
    setSelectedProf(null);
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : foundUsers || users;

    const sortedUsers = orderBy(
      filteredUsers,
      [sortBy.iterator],
      [sortBy.order]
    );

    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endEndex = startIndex + USERS_PER_PAGE;
    const currentPageUsers = sortedUsers.slice(startIndex, endEndex);

    return (
      <div className="d-flex p-4">
        {professions && (
          <div className="d-flex flex-shrink-0 p-2 flex-column me-4">
            <GroupList
              items={professions}
              onItemSelect={handlePfofessionSelect}
              selectedItem={selectedProf}
            />
            <button
              className="btn btn-secondary mt-2"
              onClick={handleClearFilter}
            >
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column flex-grow-1 align-items-start">
          <SearchStatus length={filteredUsers.length} />
          <form className="search w-100 mt-2">
            <SearchField
              name="search"
              value={searchField}
              placeholder="Search.."
              onChange={handleChangeSearch}
            />
          </form>
          {currentPageUsers.length && (
            <div className="d-flex flex-column w-100">
              <UserTable
                users={currentPageUsers}
                onSort={handleSort}
                currentSort={sortBy}
                onDelete={handleDelete}
                onLikesToggle={handleLikesToggle}
              />
              {filteredUsers.length > USERS_PER_PAGE && (
                <div className="d-flex justify-content-center">
                  <Pagination
                    usersAmount={filteredUsers.length}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
  return <p className="px-4">loading...</p>;
};

export default UsersListPage;
