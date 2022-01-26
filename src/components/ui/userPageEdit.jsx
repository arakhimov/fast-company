/* eslint-disable multiline-ternary */
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getCurrentUserId, updateUser } from "../../store/users";
import EditForm from "./editForm";

const UserPageEdit = ({ user }) => {
  const { userId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleRedirectToUserPage = () => {
    history.push(`/users/${userId}`);
  };

  const currentUserId = useSelector(getCurrentUserId());

  const handleUpdateUser = (data) => {
    dispatch(updateUser({ ...user, ...data }));
  };

  // перенаправление при попытке перехода через адресную строку к редактированию чужой страницы

  return (
    <>
      {currentUserId !== userId ? (
        <Redirect to={`/users/${currentUserId}/edit`} />
      ) : (
        <div className="container mt-4">
          <button
            className="btn bg-primary text-white"
            type="button"
            onClick={handleRedirectToUserPage}
          >
            <i className="bi bi-caret-left me-1" />
            Назад
          </button>
          <div className="col-md-6 offset-md-3 shadow p-4">
            <EditForm data={user} update={handleUpdateUser} />
          </div>
        </div>
      )}
    </>
  );
};

UserPageEdit.propTypes = {
  user: PropTypes.object
};

export default UserPageEdit;
