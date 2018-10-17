import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getCourses, getProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import SemesterCourse from "./SemesterCourse";

class CurrentSemester extends Component {
  componentDidMount() {
    this.props.getCourses();
    this.props.getProfile();
  }

  getPercentage(val1, val2) {
    let result = ((val1 * 100) / val2).toFixed(0);

    if (isNaN(result)) {
      return 0;
    }
    return result;
  }

  getFullAttendance(coursesAttendance) {
    const courseAttendance = coursesAttendance.map(course => course.attendance);
    let allAttendance = courseAttendance.reduce((acc, nextVal) => {
      return {
        classesHeld: acc.classesHeld + nextVal.classesHeld,
        classesTaken: acc.classesTaken + nextVal.classesTaken,
        classesLeft: acc.classesLeft + nextVal.classesLeft
      };
    });

    return allAttendance;
  }

  render() {
    const { courses, loading, profile } = this.props.profile;

    let currentSemesterContent;

    if (profile === null) {
      currentSemesterContent = (
        <div className="col-md-12 m-auto">
          <Spinner />
        </div>
      );
    } else if (profile.noprofile) {
      currentSemesterContent = (
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
        currentSemesterContent = (
          <div className="col-md-8 m-auto">
            <Spinner />
          </div>
        );
      } else {
        if (Object.keys(courses).length > 0) {
          let currentSem = profile.semester.split(" ")[0];

          let semesterCourses = courses.filter(
            course => course.semester === currentSem
          );

          let semAttendance = this.getFullAttendance(semesterCourses);

          let currentCourseAttendance = semesterCourses.map((course, index) => (
            <SemesterCourse key={course._id} index={index} course={course} />
          ));

          currentSemesterContent = (
            <div>
              <h3>Attendance</h3>
              <table className="table table-sm table-responsive-sm table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Course</th>
                    <th>Held</th>
                    <th>Taken</th>
                    <th>Left</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCourseAttendance}
                  <tr className="bg-light">
                    <td />
                    <td />
                    <td className="lead">{semAttendance.classesHeld}</td>
                    <td className="lead">{semAttendance.classesTaken}</td>
                    <td className="lead">{semAttendance.classesLeft}</td>
                    <td className="lead">
                      {this.getPercentage(
                        semAttendance.classesTaken,
                        semAttendance.classesHeld
                      )}
                    </td>
                    {}
                  </tr>
                </tbody>
              </table>
            </div>
          );
        } else {
          <div className="col-md-12 m-auto text-center">
            <h2>No Course Added</h2>
            <Link to="/profile/addCourse" className="btn btn-success mt-2">
              Add Course
            </Link>
          </div>;
        }
      }
    }

    return (
      <div className="current-semester">
        <div className="container">{currentSemesterContent}</div>
      </div>
    );
  }
}

CurrentSemester.propTypes = {
  profile: PropTypes.object.isRequired,
  getCourses: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCourses, getProfile }
)(CurrentSemester);
