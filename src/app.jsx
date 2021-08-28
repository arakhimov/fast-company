import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./API";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = id => {
    setUsers(users.filter(user => user._id !== id));
  };

  const handleLikesToggle = id => {
    const newUsers = [...users];
    const elementIndex = users.findIndex(user => user._id === id);
    newUsers[elementIndex].status = !newUsers[elementIndex].status;
    setUsers(newUsers);
  };

  return (
    <>
      <SearchStatus length={users.length} />
      <Users users={users} onDelete={handleDelete} onLikesToggle={handleLikesToggle} />
    </>
  );
};

export default App;
