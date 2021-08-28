import React from "react";
import User from "./user";

const Users = ({ users, ...rest }) => {
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
            <th scope="col">Избранное</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return <User key={user._id} {...user} {...rest} />;
          })}
        </tbody>
      </table>
    ) : null;
  };

  return <>{getUsersTable(users)}</>;
};

export default Users;
