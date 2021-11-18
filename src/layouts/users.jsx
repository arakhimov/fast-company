import PropTypes from "prop-types";
import React from "react";
import UsersListPage from "../components/page/userListPage";
import UserPage from "../components/page/userPage/userPage";
import { UsersProvider } from "../hooks/useUsers";

const Users = ({ match }) => {
  const userId = match.params.userId;

  return (
    <UsersProvider>{userId ? <UserPage /> : <UsersListPage />}</UsersProvider>
  );
};

Users.propTypes = {
  match: PropTypes.object.isRequired
};

export default Users;
