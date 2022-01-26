import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList
} from "../../../store/qualities";
import Quality from "./quality";

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = useSelector(getQualitiesByIds(qualities));

  useEffect(() => {
    dispatch(loadQualitiesList);
  }, []);

  if (!isLoading) {
    return qualitiesList.map((quality) => (
      <Quality key={quality._id} {...quality} />
    ));
  }
  return <p>loading...</p>;
};

QualitiesList.propTypes = {
  qualities: PropTypes.arrayOf(PropTypes.string)
};

export default QualitiesList;
