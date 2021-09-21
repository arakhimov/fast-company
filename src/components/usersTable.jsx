import PropTypes from "prop-types";
import React from "react";
import BookMark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";
// import TableBody from "./tableBody";
// import TableHeader from "./tableHeader";

const UsersTable = ({
  users,
  onSort,
  currentSort,
  onLikesToggle,
  onDelete
}) => {
  const columns = {
    name: { path: "name", name: "Имя" },
    qualities: {
      name: "Качества",
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    profession: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <BookMark
          onLikesToggle={onLikesToggle}
          id={user._id}
          status={user.bookmark}
        />
      )
    },
    delete: {
      component: (user) => (
        <button
          onClick={() => onDelete(user._id)}
          type="button"
          className="btn btn-danger"
        >
          delete
        </button>
      )
    }
  };

  return (
    <Table
      onSort={onSort}
      currentSort={currentSort}
      columns={columns}
      data={users}
    />
    // <Table>
    //   <TableHeader {...{ onSort, currentSort, columns }} />
    //   <TableBody {...{ data: users, columns }} />
    // </Table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  currentSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  onLikesToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UsersTable;
