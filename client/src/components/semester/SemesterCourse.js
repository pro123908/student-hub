import React, { Component } from "react";

class SemesterCourse extends Component {
  getPercentage(val1, val2) {
    let result = ((val1 * 100) / val2).toFixed(0);

    if (isNaN(result)) {
      return 0;
    }
    return result;
  }

  render() {
    const { course, index } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{course.name}</td>
        <td>{course.attendance.classesHeld}</td>
        <td>{course.attendance.classesTaken}</td>
        <td>{course.attendance.classesLeft}</td>
        <td>
          {this.getPercentage(
            course.attendance.classesTaken,
            course.attendance.classesHeld
          )}{" "}
        </td>
      </tr>
    );
  }
}

export default SemesterCourse;
