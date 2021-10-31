import PropTypes from "prop-types";
import React from "react";
import UsersListPage from "../components/page/userListPage";
import UserPage from "../components/page/userPage/userPage";

const Users = ({ match }) => {
  const userId = match.params.userId;

  return userId ? <UserPage /> : <UsersListPage />;
};

Users.propTypes = {
  match: PropTypes.object.isRequired
};

export default Users;
