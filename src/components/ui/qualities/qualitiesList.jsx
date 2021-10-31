import React from "react";
import Quality from "./quality";

const QualitiesList = ({ qualities }) => {
  return qualities.map((quality) => <Quality key={quality._id} {...quality} />);
};

export default QualitiesList;
