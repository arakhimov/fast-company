/* eslint-disable indent */
import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import { userService } from "../services/userService";
import { generateAuthError } from "../utils/generateAuthError";
import getRandomInt from "../utils/getRandomInt";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: [],
      isLoading: true,
      errors: null,
      auth: { userId: localStorageService.getUserId() },
      isloggedIn: true,
      dataLoaded: false
    }
  : {
      entities: [],
      isLoading: false,
      errors: null,
      auth: null,
      isloggedIn: false,
      dataLoaded: false
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersRecieved: (state, action) => {
      state.isLoading = false;
      state.dataLoaded = true;
      state.entities = action.payload;
    },
    usersRequestFailed: (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isloggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.errors = action.payload;
    },
    authRequested: (state) => {
      state.errors = null;
    },
    userCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    userLogOut: (state) => {
      state.entities = null;
      state.auth = null;
      state.dataLoaded = false;
      state.isloggedIn = false;
    },
    updateCurrentUserData: (state, action) => {
      const currentUserIndex = state.entities.findIndex(
        (user) => user._id === state.auth.userId
      );
      state.entities[currentUserIndex] = action.payload;
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersRecieved,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated,
  userLogOut,
  updateCurrentUserData
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const userCreateFailed = createAction("users/userCreateFailed");
const usersUpdateRequested = createAction("users/usersUpdateRequested");
const usersUpdateRequestFailed = createAction("users/usersUpdateRequestFailed");

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersRecieved(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
    dispatch(authRequestFailed(error.message));
  }
};

export const signUp =
  ({ email, password, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, password });
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.localId }));
      dispatch(
        createUser({
          _id: data.localId,
          email,
          rate: getRandomInt(1, 5),
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          completedMeetings: getRandomInt(0, 200),
          ...rest
        })
      );
    } catch (error) {}
  };

export const login =
  ({ payload, redirect }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.localId }));
      history.push(redirect);
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLogOut());
  history.push("/");
};

function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested());
    try {
      const { content } = await userService.create(payload);
      dispatch(userCreated(content));
      history.push("/");
    } catch (error) {
      dispatch(userCreateFailed(error.message));
    }
  };
}

export function updateUser(payload) {
  return async function (dispatch) {
    dispatch(usersUpdateRequested());
    try {
      const { content } = await userService.updateUser(payload);
      dispatch(updateCurrentUserData(content));
    } catch (error) {
      dispatch(usersUpdateRequestFailed());
    }
  };
}

export const getUsers = () => (state) => {
  return state.users.entities;
};

export const getUsersLoadingStatus = () => (state) => {
  return state.users.isLoading;
};

export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((user) => user._id === userId);
  }
};

export const getGetCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((user) => user._id === state.users.auth.userId)
    : null;
};

export const getiIsloggedIn = () => (state) => {
  return state.users.isloggedIn;
};

export const dataStatus = () => (state) => {
  return state.users.dataLoaded;
};

export const getCurrentUserId = () => (state) => {
  return state.users.auth.userId;
};

export const getAuthError = () => (state) => {
  return state.users.errors;
};

export default usersReducer;
