import React, { Component } from "react";
import { Link } from "react-router-dom";

class SemesterResultItem extends Component {
  render() {
    const { course, index, courseDisplay, onDelete,flag } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{course.name}</td>
        <td>{course.code}</td>
        <td>{course.ch}</td>
        <td>{course.teacher}</td>
        {courseDisplay && !flag ? (
          <td>
            <Link
              to={`/profile/courses/attendance/${course._id}`}
              className="btn btn-info btn-sm"
            >
              View Attendance
            </Link>
          </td>
        ) : (
          <td>{course.GPA.toFixed(2)}</td>
        )}
        {courseDisplay && !flag ?  (
          <td>
            <Link
              to={`/profile/courses/edit/${course._id}`}
              className="btn btn-success mr-2 btn-sm"
            >
              Edit Course
            </Link>
            <button
              onClick={onDelete.bind(this, course._id)}
              className="btn btn-outline-danger btn-sm mt-res-2"
            >
              Delete
            </button>
          </td>
        ) : (
          <td>
            <Link
              to={`/profile/courses/edit/${course._id}`}
              className="btn btn-success btn-sm"
            >
              Edit GPA
            </Link>
          </td>
        )}
      </tr>
    );
  }
}

export default SemesterResultItem;
