import React, { useState } from "react";
import api from "../API";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = id => {
    setUsers(users.filter(user => user._id !== id));
  };

  const renderPhrase = number => {
    if (number === 0) {
      return "Никто с тобой не тусанет";
    }

    return `${number} человек${number > 1 && number < 5 ? "a" : ""} тусан${
      number === 1 ? "ё" : "у"
    }т с тобой сегодня`;
  };

  const getBadge = quality => {
    return (
      <span className={`badge bg-${quality.color} m-1`} key={quality._id}>
        {quality.name}
      </span>
    );
  };

  const getUsersTable = users => {
    return users.length ? (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th colSpan="2" scope="col">
              Оценка
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user._id}>
                <th className="fw-normal" scope="row">
                  {user.name}
                </th>
                <td>{user.qualities.map(getBadge)}</td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{`${user.rate}/5`}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    ) : null;
  };

  return (
    <>
      <h1 className={`badge fs-3 bg-${users.length ? "primary" : "danger"}`}>
        {renderPhrase(users.length)}
      </h1>
      {getUsersTable(users)}
    </>
  );
};

export default Users;
