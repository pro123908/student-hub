import React, { Component } from "react";
import { Link } from "react-router-dom";

class CourseItem extends Component {
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
          <Link to="/course" className="btn btn-info">
            View Attendance
          </Link>
        </td>
      </tr>
    );
  }
}

export default CourseItem;
