import React, { Component } from "react";
import SemesterResultItem from "./SemesterResultItem";
import { Link } from "react-router-dom";

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
        <div className="row">
          <div className="col-md-6">
            <h3 className="in-sem-heading text-center-res">
              {semesterName} Semester
            </h3>
          </div>
          <div className="col-md-6 text-center">
            <Link
              to={`/profile/courses/attendance/semester/${semesterName}`}
              className="btn btn-outline-info btn-sm mb-res-2"
            >
              Semester Attendance
            </Link>
          </div>
        </div>

        <table className="table table-sm table-responsive table-hover">
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
        <hr />
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
