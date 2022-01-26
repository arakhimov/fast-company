import { createAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { commentService } from "../services/comments.service";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: [],
    isLoading: true,
    errors: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsRecieved: (state, action) => {
      state.isLoading = false;
      state.entities = action.payload;
    },
    commentsRequestFailed: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    commentCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    commentDeleted: (state, action) => {
      state.entities = state.entities.filter(
        (comment) => comment._id !== action.payload
      );
    }
  }
});

const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentCreateRequestFailed = createAction(
  "comments/commentCreateRequestFailed"
);
const commentRemoveRequested = createAction("comments/commentRemoveRequested");
const commentRemoveRequestFailed = createAction(
  "comments/commentRemoveRequestFailed"
);

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsRecieved,
  commentsRequestFailed,
  commentCreated,
  commentDeleted
} = actions;

export const loadCommentsList = (pageId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(pageId);
    dispatch(commentsRecieved(content));
  } catch (error) {
    dispatch(commentsRequestFailed());
  }
};

export function createComment(payload) {
  return async function (dispatch) {
    dispatch(commentCreateRequested());
    const comment = {
      ...payload,
      createdAt: Date.now(),
      _id: nanoid()
    };
    try {
      const { content } = await commentService.createComment(comment);
      dispatch(commentCreated(content));
    } catch (error) {
      dispatch(commentCreateRequestFailed());
    }
  };
}

export function removeComment(commentId) {
  return async function (dispatch) {
    dispatch(commentRemoveRequested());
    try {
      const { content } = await commentService.removeComment(commentId);
      if (content === null) {
        dispatch(commentDeleted(commentId));
      }
    } catch (error) {
      dispatch(commentRemoveRequestFailed());
    }
  };
}

export const getComments = () => (state) => state.comments.entities;

export default commentsReducer;
