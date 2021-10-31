import PropTypes from "prop-types";
import React from "react";
import Comment from "../ui/comment";

const CommentsList = ({ users, comments, onRemove }) => {
  return (
    <>
      {comments && comments.length !== 0 && (
        <div className="card p-3">
          <h1 className="border-bottom pb-3">Comments</h1>
          <ul className="list-group border-0">
            {comments.map((comment) => (
              <Comment
                onRemove={onRemove}
                key={comment._id}
                {...comment}
                name={
                  users &&
                  users.find((user) => user._id === comment.userId).name
                }
              />
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
