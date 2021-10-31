import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../API";
import CommentsList from "./commentsList";
import NewCommentForm from "./newCommentForm";

const Comments = () => {
  const { userId } = useParams();
  const [users, setUsers] = useState();
  const [comments, setComments] = useState();

  useEffect(
    () =>
      api.comments
        .fetchCommentsForUser(userId)
        .then((data) => setComments(data)),
    []
  );
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleRemove = (id) => {
    api.comments.remove(id);
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  };

  const handleAddComment = (message, pageId) => {
    api.comments.add(message, userId, pageId);
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  };

  return (
    <div className="">
      <NewCommentForm users={users} onAddComment={handleAddComment} />
      <CommentsList users={users} comments={comments} onRemove={handleRemove} />
    </div>
  );
};

export default Comments;
