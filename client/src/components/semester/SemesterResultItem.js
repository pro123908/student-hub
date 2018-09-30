import React, { Component } from "react";

class SemesterResultItem extends Component {
  render() {
    const { course, index } = this.props;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{course.name}</td>
        <td>{course.code}</td>
        <td>{course.ch}</td>
        <td>{course.teacher}</td>
        <td>{course.GPA}</td>
      </tr>
    );
  }
}

export default SemesterResultItem;
