import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { qualityService } from "../services/quality.service";

const QualityContext = React.createContext();

export const useQuality = () => {
  return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getQualitiesList();
  }, []);
  useEffect(() => {
    setError(null);
    toast(error);
  }, [error]);

  async function getQualitiesList() {
    try {
      const { content } = await qualityService.get();
      setQualities(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }

    function errorCatcher(error) {
      const { message } = error.response.data;
      setError(message);
    }
  }

  const getQuality = (id) => {
    return qualities.find((item) => item._id === id);
  };

  return (
    <QualityContext.Provider value={{ qualities, isLoading, getQuality }}>
      {children}
    </QualityContext.Provider>
  );
};

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
