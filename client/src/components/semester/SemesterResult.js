import React, { Component } from "react";
import SemesterResultItem from "./SemesterResultItem";

class SemesterResult extends Component {
  getCGPA(course) {
    let GPAs = course.map(course => course.GPA);
    let creditHours = course.map(course => course.ch);

    GPAs = GPAs.map((GPA, index) => {
      return GPA * creditHours[index];
    });

    creditHours = creditHours.reduce((acc, nextVal) => {
      return acc + nextVal;
    });

    GPAs = GPAs.reduce((acc, nextVal) => {
      return acc + nextVal;
    });

    return (GPAs / creditHours).toFixed(2);
  }
  render() {
    const { semesterName, course, courseDisplay, onDelete } = this.props;

    let semesterContent;

    let courseItem;
    let CGPA = this.getCGPA(course);

    courseItem = course.map((course, index) => (
      <SemesterResultItem
        key={course._id}
        course={course}
        index={index}
        courseDisplay={courseDisplay}
        onDelete={onDelete}
      />
    ));

    semesterContent = (
      <div className="">
        <h3>{semesterName} Semester</h3>
        <table className="table table-sm  table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Code</th>
              <th>Credit Hours</th>
              <th>Teacher</th>
              {courseDisplay ? <th>Attendance</th> : <th>GPA</th>}
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {courseItem}
            {courseDisplay ? (
              ""
            ) : (
              <tr className="mt-4 bg-light">
                <td />
                <td />
                <td />
                <td />
                <td className="lead">GPA</td>
                <td className="lead ">{CGPA}</td>
                <td />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );

    return (
      <div className="semester" style={{ marginBottom: "5%" }}>
        {semesterContent}
      </div>
    );
  }
}

export default SemesterResult;
