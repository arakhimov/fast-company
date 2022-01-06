import React, { useEffect, useState } from "react";
import api from "../../API";
import { useComments } from "../../hooks/useComments";
import CommentsList from "./commentsList";
import NewCommentForm from "./newCommentForm";

const Comments = () => {
  const [users, setUsers] = useState();
  const { createComment, comments, removeComment } = useComments();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleRemove = (id) => {
    removeComment(id);
  };

  const handleAddComment = (data) => {
    createComment(data);
  };

  return (
    <div className="">
      <NewCommentForm users={users} onAddComment={handleAddComment} />
      <CommentsList comments={comments} onRemove={handleRemove} />
    </div>
  );
};

export default Comments;
