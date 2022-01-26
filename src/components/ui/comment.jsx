import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUserById } from "../../store/users";
import { getFormatDate } from "../../utils/getFormatDate";

const Comment = ({ _id, content, createdAt, userId, onRemove }) => {
  const user = useSelector(getUserById(userId));
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <li className="list-group-item border-0 d-flex flex-wrap">
      <img
        src={user.image}
        className="rounded-circle shadow-1-strong mb-2 me-2"
        alt="avatar"
        width="80"
        height="80"
      />
      <div className="d-flex flex-column justify-content-center flex-grow-1 position-relative">
        <p className="mb-1 text-primary fs-4">
          {user.name}
          <span className="fs-6"> &#8212; {getFormatDate(createdAt)}</span>
        </p>
        <p>{content}</p>
        {currentUserId === userId && (
          <button
            type="button"
            className="btn btn-sm position-absolute top-0 end-0 text-primary"
            onClick={() => onRemove(_id)}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        )}
      </div>
    </li>
  );
};

Comment.propTypes = {
  _id: PropTypes.string,
  content: PropTypes.string,
  createdAt: PropTypes.number,
  userId: PropTypes.string,
  onRemove: PropTypes.func
};

export default Comment;
