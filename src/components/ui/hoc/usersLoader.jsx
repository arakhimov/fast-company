import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataStatus, loadUsersList } from "../../../store/users";

const UsersLoader = ({ children }) => {
  const isDataloaded = useSelector(dataStatus());
  const dispatch = useDispatch;

  useEffect(() => {
    if (!isDataloaded) {
      dispatch(loadUsersList());
    }
  }, []);

  if (!isDataloaded) return <p>Loading...</p>;
  return children;
};

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default UsersLoader;
