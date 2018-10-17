import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  getCourses,
  deleteCourse,
  getProfile
} from "../../actions/profileActions";
import Spinner from "../common/Spinner";

import SemesterResult from "../semester/SemesterResult";

class Courses extends Component {
  componentDidMount() {
    this.props.getCourses();
    this.props.getProfile();
  }

  onDelete(id) {
    this.props.deleteCourse(id);
  }

  render() {
    const { courses, loading } = this.props.profile;
    const { profile } = this.props.profile;

    let coursesContent;

    if (profile === null) {
      coursesContent = (
        <div className="col-md-12 m-auto">
          <Spinner />
        </div>
      );
    } else if (profile.noprofile) {
      coursesContent = (
        <div className="row text-center">
          <div class="col-md-12">
            <h3 className="mb-4">You need to have profile created first</h3>
            <Link className="btn btn-large btn-info" to="/createProfile">
              Create Profile
            </Link>
          </div>
        </div>
      );
    } else {
      if (courses === null || loading) {
        coursesContent = (
          <div className="col-md-12 m-auto">
            <Spinner />
          </div>
        );
      } else {
        if (Object.keys(courses).length > 0) {
          let firstSemester = courses.filter(
            course => course.semester === "First"
          );
          let secondSemester = courses.filter(
            course => course.semester === "Second"
          );
          let thirdSemester = courses.filter(
            course => course.semester === "Third"
          );
          let fourthSemester = courses.filter(
            course => course.semester === "Fourth"
          );
          let fivethSemester = courses.filter(
            course => course.semester === "Fivth"
          );
          let sixthSemester = courses.filter(
            course => course.semester === "Sixth"
          );
          let seventhSemester = courses.filter(
            course => course.semester === "Seventh"
          );
          let finalSemester = courses.filter(
            course => course.semester === "Final"
          );

          coursesContent = (
            <div>
              <div className="row">
                <h2 className="col-md-6 mb-4 text-center-res">Courses</h2>
                <div className="col-md-6">
                  <Link
                    to="/profile/courses/attendance"
                    className="btn btn-success mr-2 col-md-4 col-sm-12"
                  >
                    Overall Attendance
                  </Link>
                  <Link
                    to="/profile/addCourse"
                    className="btn btn-success col-md-4 col-sm-12 "
                  >
                    Add Course
                  </Link>
                </div>
              </div>
              {firstSemester.length !== 0 ? (
                <SemesterResult
                  semesterName="First"
                  course={firstSemester}
                  courseDisplay={true}
                  onDelete={this.onDelete.bind(this)}
                />
              ) : (
                ""
              )}
              {secondSemester.length !== 0 ? (
                <SemesterResult
                  semesterName="Second"
                  course={secondSemester}
                  courseDisplay={true}
                  onDelete={this.onDelete.bind(this)}
                />
              ) : (
                ""
              )}
              {thirdSemester.length !== 0 ? (
                <SemesterResult
                  semesterName="Third"
                  course={thirdSemester}
                  courseDisplay={true}
                  onDelete={this.onDelete.bind(this)}
                />
              ) : (
                ""
              )}
              {fourthSemester.length !== 0 ? (
                <SemesterResult
                  semesterName="Fourth"
                  course={fourthSemester}
                  courseDisplay={true}
                  onDelete={this.onDelete.bind(this)}
                />
              ) : (
                ""
              )}
              {fivethSemester.length !== 0 ? (
                <SemesterResult
                  semesterName="Fivth"
                  course={fivethSemester}
                  courseDisplay={true}
                  onDelete={this.onDelete.bind(this)}
                />
              ) : (
                ""
              )}
              {sixthSemester.length !== 0 ? (
                <SemesterResult
                  semesterName="Sixth"
                  course={sixthSemester}
                  courseDisplay={true}
                  onDelete={this.onDelete.bind(this)}
                />
              ) : (
                ""
              )}
              {seventhSemester.length !== 0 ? (
                <SemesterResult
                  semesterName="Seventh"
                  course={seventhSemester}
                  courseDisplay={true}
                  onDelete={this.onDelete.bind(this)}
                />
              ) : (
                ""
              )}
              {finalSemester.length !== 0 ? (
                <SemesterResult
                  semesterName="Final"
                  course={finalSemester}
                  courseDisplay={true}
                  onDelete={this.onDelete.bind(this)}
                />
              ) : (
                ""
              )}
            </div>
          );

          // coursesContent = (
          //   <div>
          //     <div className="row">
          //       <h2 className="col-md-6 mb-4">Courses</h2>
          //       <div className="col-md-6">
          //         <Link
          //           to="/profile/courses/attendance"
          //           className="btn btn-success mr-2 col-md-4 col-sm-12"
          //         >
          //           Overall Attendance
          //         </Link>
          //         <Link
          //           to="/profile/addCourse"
          //           className="btn btn-success col-md-4 col-sm-12 "
          //         >
          //           Add Course
          //         </Link>
          //       </div>
          //     </div>
          //     <table className="table table-sm table-responsive-sm">
          //       <thead>
          //         <tr>
          //           <th>#</th>
          //           <th>Name</th>
          //           <th>Code</th>
          //           <th>Credit Hours</th>
          //           <th>Teacher</th>
          //           <th>Sem</th>
          //           <th>Attendance</th>
          //           <th>Actions</th>
          //         </tr>
          //       </thead>
          //       <tbody>{allCourses}</tbody>
          //     </table>
          //   </div>
          // );
        } else {
          coursesContent = (
            <div className="col-md-12 m-auto text-center">
              <h2>No Course Added</h2>
              <Link to="/profile/addCourse" className="btn btn-success mt-2">
                Add Course
              </Link>
            </div>
          );
        }
      }
    }

    return <div className="container">{coursesContent}</div>;
  }
}

Courses.propTypes = {
  profile: PropTypes.object.isRequired,
  getCourses: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCourses, deleteCourse, getProfile }
)(Courses);
