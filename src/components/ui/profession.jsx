import PropTypes from "prop-types";
import React from "react";
import { useProfession } from "../../hooks/useProfession";

const Profession = ({ id }) => {
  const { getProfession, isLoading } = useProfession();
  const profession = getProfession(id);
  if (!isLoading) {
    return <p>{profession.name}</p>;
  }
  return <p>loading...</p>;
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
