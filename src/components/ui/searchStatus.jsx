import PropTypes from "prop-types";
import React from "react";

const SearchStatus = ({ length }) => {
  const renderPhrase = number => {
    if (number === 0) {
      return "Никто с тобой не тусанет";
    }
    return `${number} человек${number > 1 && number < 5 ? "a" : ""} тусан${
      number === 1 ? "ё" : "у"
    }т с тобой сегодня`;
  };

  return (
    <h1 className={`badge fs-3 bg-${length ? "primary" : "danger"}`}>
      {renderPhrase(length)}
    </h1>
  );
};

SearchStatus.propTypes = { length: PropTypes.number.isRequired };

export default SearchStatus;
