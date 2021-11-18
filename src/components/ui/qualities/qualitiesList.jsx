import PropTypes from "prop-types";
import React from "react";
import { useQuality } from "../../../hooks/useQuality";
import Quality from "./quality";

const QualitiesList = ({ qualities }) => {
  const { isLoading, getQuality } = useQuality();
  if (!isLoading) {
    return qualities
      .map((item) => getQuality(item))
      .map((quality) => <Quality key={quality._id} {...quality} />);
  }
  return <p>loading...</p>;
};

QualitiesList.propTypes = {
  qualities: PropTypes.arrayOf(PropTypes.string)
};

export default QualitiesList;
