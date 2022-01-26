import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getCurrentUserId } from "../../store/users";
import Qualities from "../ui/qualities/qualitiesList";
import Comments from "./comments";

const UserDescription = ({ user }) => {
  const currentUserId = useSelector(getCurrentUserId());
  const { userId } = useParams();
  const history = useHistory();

  const handleRedirectToEditPage = () => {
    history.push(`${history.location.pathname}/edit`);
  };

  return (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4">
          <div className="card mb-3 d-flex flex-column align-items-center py-2 position-relative">
            <img
              src={user.image}
              className="rounded-circle shadow-1-strong mb-2"
              alt="avatar"
              width="120"
              height="120"
            />
            <h2 className="fs-3">{user.name}</h2>
            <h3 className="fs-4 text-secondary">{user.profession.name}</h3>
            <p className="rate d-flex text-secondary align-items-center">
              <i className="bi bi-caret-down-fill text-primary"></i>
              <i className="bi bi-caret-up"></i>
              <span className="ps-2 fs-5">{user.rate}</span>
            </p>
            {currentUserId === userId && (
              <button
                className="position-absolute top-0 end-0 btn btn-sm"
                type="button"
                onClick={handleRedirectToEditPage}
              >
                <i className="bi bi-gear-fill"></i>
              </button>
            )}
          </div>
          <div className="card mb-3 d-flex flex-column align-items-center py-2">
            <h2 className="fs-4">Qualities</h2>
            <div className="wrapper">
              <Qualities qualities={user.qualities} />
            </div>
          </div>
          <div className="card mb-3 d-flex flex-column align-items-center py-2">
            <h2 className="fs-4">Complited meetings</h2>
            <p className="fs-1">{user.completedMeetings}</p>
          </div>
        </div>
        <div className="col-md-8">
          = <Comments />
        </div>
      </div>
    </div>
  );
};

UserDescription.propTypes = {
  user: PropTypes.object
};

export default UserDescription;
