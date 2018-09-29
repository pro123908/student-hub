import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getCourseAttendance,
  updateCourseAttendance
} from "../../actions/profileActions";
import Spinner from "../common/Spinner";

class CourseAttendance extends Component {
  componentDidMount() {
    if (this.props.match.params.courseID) {
      this.props.getCourseAttendance(this.props.match.params.courseID);
    }
  }

  classTaken() {
    const attendanceData = {
      held: 1,
      taken: 1,
      left: 0
    };

    this.props.updateCourseAttendance(
      attendanceData,
      this.props.match.params.courseID
    );
  }

  classLeft() {
    const attendanceData = {
      held: 1,
      taken: 0,
      left: 1
    };

    this.props.updateCourseAttendance(
      attendanceData,
      this.props.match.params.courseID
    );
  }

  getPercentage(val1, val2) {
    let result = ((val1 * 100) / val2).toFixed(2);

    if (isNaN(result)) {
      return 0;
    }
    return result;
  }

  render() {
    const { course, loading } = this.props.profile;

    let courseAttendanceContent;

    if (course === null || loading) {
      courseAttendanceContent = <Spinner />;
    } else {
      courseAttendanceContent = (
        <div>
          <Link to="/profile/courses" className="btn btn-light mb-4">
            Back to courses
          </Link>
          <div>
            <h1 className="mb-4">{course.name} Attendance</h1>
            <hr />
            <div className="ml-4">
              <p className="lead text-primary">
                Held : {course.attendance.classesHeld}
              </p>
              <p className="lead text-success">
                Taken : {course.attendance.classesTaken}
              </p>
              <p className="lead text-danger">
                Left : {course.attendance.classesLeft}
              </p>
              <p className="lead text-secondary">
                Percentage :{" "}
                {this.getPercentage(
                  course.attendance.classesTaken,
                  course.attendance.classesHeld
                )}
                %
              </p>
            </div>
          </div>
          <hr />
          <div>
            <h4 className="mb-3">
              Update Attendance{" "}
              <span className="small text-muted">
                (If class is taken or left)
              </span>
            </h4>

            <button
              className="btn btn-success mr-2"
              onClick={this.classTaken.bind(this)}
            >
              Taken
            </button>
            <button
              className="btn btn-danger"
              onClick={this.classLeft.bind(this)}
            >
              Left
            </button>
          </div>
        </div>
      );
    }

    return <div>{courseAttendanceContent}</div>;
  }
}

CourseAttendance.propTypes = {
  profile: PropTypes.object.isRequired,
  getCourseAttendance: PropTypes.func.isRequired,
  updateCourseAttendance: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCourseAttendance, updateCourseAttendance }
)(CourseAttendance);
