import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import api from "../API";
import { USERS_PER_PAGE } from "../constants/constants";
import GroupList from "./groupList";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import User from "./user";

const Users = ({ users, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [professions, setProfessions] = useState();

  useEffect(() => {
    api.professions.fetchAll().then(data => setProfessions(data));
  }, []);

  const handlePageChange = number => {
    setCurrentPage(number);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handlePfofessionSelect = item => {
    setSelectedProf(item);
  };

  const filteredUsers = selectedProf
    ? users.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
    : users;

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endEndex = startIndex + USERS_PER_PAGE;
  const currentPageUsers = filteredUsers.slice(startIndex, endEndex);

  const handleClearFilter = () => {
    setSelectedProf(null);
  };

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-shrink-0 p-2 flex-column">
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
        {currentPageUsers.length && (
          <div className="d-flex flex-column w-100">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Имя</th>
                  <th scope="col">Качества</th>
                  <th scope="col">Профессия</th>
                  <th scope="col">Встретился, раз</th>
                  <th colSpan="2" scope="col">
                    Оценка
                  </th>
                  <th scope="col">Избранное</th>
                </tr>
              </thead>
              <tbody>
                {currentPageUsers.map(user => {
                  return <User key={user._id} {...user} {...rest} />;
                })}
              </tbody>
            </table>
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
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onLikesToggle: PropTypes.func.isRequired
};

export default Users;
