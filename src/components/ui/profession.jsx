import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import {
  getProfessionById,
  getProfissionLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
  const isLoading = useSelector(getProfissionLoadingStatus());
  const profession = useSelector(getProfessionById(id));
  if (!isLoading) {
    return <p>{profession.name}</p>;
  }
  return <p>loading...</p>;
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
