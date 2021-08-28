import React from "react";
import Quality from "./quality";
import BookMark from "./bookmark";

const User = ({ name, qualities, profession, rate, _id, completedMeetings, onDelete, onLikesToggle, status }) => {
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
          <button onClick={() => onDelete(_id)} type="button" className="btn btn-danger">
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default User;
