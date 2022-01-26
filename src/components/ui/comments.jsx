import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../../API";
import {
  createComment,
  getComments,
  loadCommentsList,
  removeComment
} from "../../store/comments";
import { getCurrentUserId } from "../../store/users";
import CommentsList from "./commentsList";
import NewCommentForm from "./newCommentForm";

const Comments = () => {
  const [users, setUsers] = useState();

  const { userId: pageId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCommentsList(pageId));
  }, [pageId]);
  const comments = useSelector(getComments());
  const currentIserId = useSelector(getCurrentUserId());

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleRemove = (id) => {
    // removeComment(id);
    dispatch(removeComment(id));
  };

  const handleAddComment = (data) => {
    dispatch(createComment({ ...data, pageId, userId: currentIserId }));
  };

  return (
    <div className="">
      <NewCommentForm users={users} onAddComment={handleAddComment} />
      <CommentsList comments={comments} onRemove={handleRemove} />
    </div>
  );
};

export default Comments;
