import PropTypes from "prop-types";
import React from "react";
import BookMark from "./bookmark";
import Quality from "./quality";

const User = ({
  name,
  qualities,
  profession,
  rate,
  _id,
  completedMeetings,
  onDelete,
  onLikesToggle,
  status
}) => {
  return (
    <>
      <tr>
        <th className="fw-normal" scope="row">
          {name}
        </th>
        <td>
          {qualities.map(quality => (
            <Quality key={quality._id} {...quality} />
          ))}
        </td>
        <td>{profession.name}</td>
        <td>{completedMeetings}</td>
        <td>{`${rate}/5`}</td>
        <td>
          <BookMark onLikesToggle={onLikesToggle} id={_id} status={status} />
        </td>
        <td>
          <button
            onClick={() => onDelete(_id)}
            type="button"
            className="btn btn-danger"
          >
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

User.propTypes = {
  name: PropTypes.string.isRequired,
  qualities: PropTypes.array.isRequired,
  profession: PropTypes.object.isRequired,
  rate: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onLikesToggle: PropTypes.func.isRequired,
  status: PropTypes.bool
};

export default User;
