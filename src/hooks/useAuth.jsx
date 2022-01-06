import axios from "axios";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import localStorageService, {
  setTokens
} from "../services/localStorage.service";
import { userService } from "../services/userService";

const AuthContext = React.createContext();

export const httpAuth = axios.create();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const history = useHistory();

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  async function signUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        rate: getRandomInt(1, 5),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        completedMeetings: getRandomInt(0, 200),
        ...rest
      });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400 && message === "EMAIL_EXISTS") {
        const errorObject = {
          email: "Пользователь с таким email уже существует"
        };
        throw errorObject;
      }
    }
  }

  async function signIn({ email, password }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await getCurrentUser();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (
        code === 400 &&
        (message === "EMAIL_NOT_FOUND" || message === "INVALID_PASSWORD")
      ) {
        const errorObject = {
          email: "Неверное имя пользователя или пароль"
        };
        throw errorObject;
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      setCurrentUser(content);
    } catch (error) {
      setError(error);
    }
  }

  async function getCurrentUser() {
    try {
      const { content } = await userService.getCurrentUser();
      setCurrentUser(content);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateUser(data) {
    try {
      const { content } = await userService.updateUser({
        ...currentUser,
        ...data
      });
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function logOut() {
    localStorageService.removeAuthData();
    setCurrentUser(null);
    history.push("/");
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <AuthContext.Provider
      value={{ signUp, currentUser, signIn, logOut, updateUser }}
    >
      {!isLoading ? children : "...loading"}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
