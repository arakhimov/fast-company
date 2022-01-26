/* eslint-disable multiline-ternary */
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById } from "../../../store/users";
import UserDescription from "../../ui/userDescription";
import UserPageEdit from "../../ui/userPageEdit";

const UserPage = () => {
  const { userId, isEdit } = useParams();
  const user = useSelector(getUserById(userId));

  if (user) {
    return (
      <>
        {isEdit ? (
          <UserPageEdit user={user} />
        ) : (
          <UserDescription user={user} />
        )}
      </>
    );
  }
  return <p className="px-4">loading...</p>;
};

export default UserPage;
