import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { professionService } from "../services/profession.service";
const ProfessionContext = React.createContext();

export const useProfession = () => {
  return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
  const [profession, setProfession] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfessionList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  async function getProfessionList() {
    try {
      const { content } = await professionService.get();
      setProfession(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  const getProfession = (id) => {
    return profession.find((item) => item._id === id);
  };

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }

  return (
    <ProfessionContext.Provider
      value={{ profession, isLoading, getProfession }}
    >
      {children}
    </ProfessionContext.Provider>
  );
};

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
