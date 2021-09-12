import React, { useEffect, useState } from "react";
import api from "./API";
import Users from "./components/users";

const App = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then(data => setUsers(data));
  }, []);

  const handleDelete = id => {
    setUsers(users.filter(user => user._id !== id));
  };

  const handleLikesToggle = id => {
    setUsers(
      users.map(user => {
        if (user._id === id) {
          return { ...user, status: !user.status };
        }
        return user;
      })
    );
  };

  return (
    <>
      {users && (
        <Users
          users={users}
          onDelete={handleDelete}
          onLikesToggle={handleLikesToggle}
        />
      )}
    </>
  );
};

export default App;
