import React, { Component } from "react";
import { Link } from "react-router-dom";

class CourseItem extends Component {
  onDelete(id) {
    this.props.onDelete(id);
  }

  render() {
    const { course, index } = this.props;
    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{course.name}</td>
        <td>{course.code}</td>
        <td>{course.ch}</td>
        <td>{course.teacher}</td>
        <td>
          <Link
            to={`/profile/courses/attendance/${course._id}`}
            className="btn btn-info"
          >
            View Attendance
          </Link>
        </td>
        <td>
          <button
            onClick={() => this.onDelete(course._id)}
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
