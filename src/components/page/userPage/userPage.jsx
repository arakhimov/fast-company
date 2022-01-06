/* eslint-disable multiline-ternary */
import React from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { CommentsProvider } from "../../../hooks/useComments";
import { useUsers } from "../../../hooks/useUsers";
import Comments from "../../ui/comments";
import EditForm from "../../ui/editForm";
import Qualities from "../../ui/qualities/qualitiesList";

const UserPage = () => {
  // const [user, setUser] = useState();
  const { userId, isEdit } = useParams();
  const history = useHistory();

  const { currentUser, updateUser } = useAuth();

  // useEffect(() => {
  //   return api.users.getUserById(userId).then((user) => setUser(user));
  // }, []);

  const { getUserById } = useUsers();
  const user = getUserById(userId);

  const handleUpdateUser = (data) => {
    // api.users.update(data).then((data) => setUser(data));
    // console.log(data);
    updateUser(data);
  };

  const handleRedirectToEditPage = () => {
    history.push(`${history.location.pathname}/edit`);
  };

  const handleRedirectToUserPage = () => {
    history.push(`/users/${userId}`);
  };

  if (user) {
    return (
      <>
        {isEdit ? (
          // перенаправление при попытке перехода через адресную строку к редактированию чужой страницы
          currentUser._id !== userId ? (
            <Redirect to={`/users/${currentUser._id}/edit`} />
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
          )
        ) : (
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
                  <h3 className="fs-4 text-secondary">
                    {user.profession.name}
                  </h3>
                  <p className="rate d-flex text-secondary align-items-center">
                    <i className="bi bi-caret-down-fill text-primary"></i>
                    <i className="bi bi-caret-up"></i>
                    <span className="ps-2 fs-5">{user.rate}</span>
                  </p>
                  {currentUser._id === userId && (
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
                <CommentsProvider>
                  <Comments />
                </CommentsProvider>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  return <p className="px-4">loading...</p>;
};

export default UserPage;
