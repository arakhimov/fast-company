import PropTypes from "prop-types";
import React from "react";
import { getFormatDate } from "../../utils/getFormatDate";

const Comment = ({ _id, content, createdAt, name, onRemove }) => {
  return (
    <li className="list-group-item border-0 d-flex flex-wrap">
      <img
        src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`}
        className="rounded-circle shadow-1-strong mb-2 me-2"
        alt="avatar"
        width="80"
        height="80"
      />
      <div className="d-flex flex-column justify-content-center flex-grow-1 position-relative">
        <p className="mb-1 text-primary fs-4">
          {name}
          <span className="fs-6"> &#8212; {getFormatDate(createdAt)}</span>
        </p>
        <p>{content}</p>
        <button
          type="button"
          className="btn btn-sm position-absolute top-0 end-0 text-primary"
          onClick={() => onRemove(_id)}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </li>
  );
};

Comment.propTypes = {
  _id: PropTypes.string,
  content: PropTypes.string,
  createdAt: PropTypes.string,
  name: PropTypes.string,
  onRemove: PropTypes.func
};

export default Comment;
