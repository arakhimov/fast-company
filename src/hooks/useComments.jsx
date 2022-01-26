import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { commentService } from "../services/comments.service";
import { getGetCurrentUserData } from "../store/users";

const CommentsContext = React.createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const { userId } = useParams();
  const currentUser = useSelector(getGetCurrentUserData());

  useEffect(() => {
    setComments(null);
    getComments(userId);
  }, [userId]);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
      setLoading(false);
    }
  }, [error]);

  async function createComment(data) {
    console.log(data);
    const comment = {
      ...data,
      createdAt: Date.now(),
      pageId: userId,
      userId: currentUser._id,
      _id: nanoid()
    };

    try {
      const { content } = await commentService.createComment(comment);
      setComments((prevState) => [...prevState, content]);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getComments(pageId) {
    try {
      const { content } = await commentService.getComments(pageId);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  async function removeComment(id) {
    try {
      const { content } = await commentService.removeComment(id);
      if (content === null) {
        setComments((prevState) =>
          prevState.filter((comment) => comment._id !== id)
        );
      }
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <CommentsContext.Provider
      value={{ comments, createComment, isLoading, removeComment }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
