import PropTypes from "prop-types";
import React from "react";
import Comment from "../ui/comment";

const CommentsList = ({ comments, onRemove }) => {
  return (
    <>
      {comments && comments.length !== 0 && (
        <div className="card p-3">
          <h1 className="border-bottom pb-3">Comments</h1>
          <ul className="list-group border-0">
            {comments
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((comment) => (
                <Comment onRemove={onRemove} key={comment._id} {...comment} />
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

CommentsList.propTypes = {
  users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  comments: PropTypes.array,
  onRemove: PropTypes.func
};

export default CommentsList;
