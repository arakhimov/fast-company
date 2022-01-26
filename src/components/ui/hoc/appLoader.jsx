import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProfessionList } from "../../../store/professions";
import { loadQualitiesList } from "../../../store/qualities";
import {
  getiIsloggedIn,
  getUsersLoadingStatus,
  loadUsersList
} from "../../../store/users";

const Apploader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getiIsloggedIn());
  const userLoadingStatus = useSelector(getUsersLoadingStatus());
  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionList());
    if (isLoggedIn) {
      dispatch(loadUsersList());
    }
  }, [isLoggedIn]);

  if (userLoadingStatus) {
    return <p>Loading...</p>;
  }
  return children;
};

Apploader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Apploader;
