import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../API";
import QualitiesList from "./qualitiesList";

const UserPage = () => {
  const [user, setUser] = useState();
  const { userId } = useParams();
  const history = useHistory();

  useEffect(() => api.users.getUserById(userId).then((user) => setUser(user)));

  const handleShowAllUsers = () => {
    history.push("/users");
  };

  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h2>{`Профессия: ${user.profession.name}`}</h2>
        <QualitiesList qualities={user.qualities} />
        <p>{`complitedMeetings: ${user.completedMeetings}`}</p>
        <h3>{`Rate: ${user.rate}`}</h3>
        <button type="button" onClick={handleShowAllUsers}>
          Все пользователи
        </button>
      </>
    );
  }
  return "loading...";
};

export default UserPage;
