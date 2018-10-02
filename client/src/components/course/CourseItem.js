import React, { Component } from "react";
import { Link } from "react-router-dom";

class CourseItem extends Component {
  render() {
    const { course, index, onDelete } = this.props;

    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{course.name}</td>
        <td>{course.code}</td>
        <td className="text-center">{course.ch}</td>
        <td>{course.teacher}</td>
        <td>{course.semester}</td>

        <td>
          <Link
            to={`/profile/courses/attendance/${course._id}`}
            className="btn btn-info"
          >
            View Attendance
          </Link>
        </td>

        <td>
          <Link
            to={`/profile/courses/edit/${course._id}`}
            className="btn btn-success mr-2"
          >
            Edit Course
          </Link>
          <button
            onClick={onDelete.bind(this, course._id)}
            className="btn btn-outline-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default CourseItem;
