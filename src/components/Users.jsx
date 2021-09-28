import PropTypes from "prop-types";
import React from "react";
import UserPage from "./userPage";
import UsersList from "./usersList";

const Users = ({ match }) => {
  const userId = match.params.userId;

  return userId ? <UserPage /> : <UsersList />;
};

Users.propTypes = {
  match: PropTypes.object.isRequired
};

export default Users;
