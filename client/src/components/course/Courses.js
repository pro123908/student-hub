import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  getCourses,
  deleteCourse,
  getProfile
} from "../../actions/profileActions";
import Check from '../Check';
import CourseRender from "../CourseRender";

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
      coursesContent = <Check flag={1} />
    } else if (profile.noprofile) {
      coursesContent = <Check flag={2} />
    } else {
      if (courses === null || loading) {
        coursesContent = <Check flag={1} />
      } else {
        if (Object.keys(courses).length > 0) {

          let courseRender = <CourseRender courses={courses} onDelete={this.onDelete.bind(this)} />
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
              {courseRender}
              
            </div>
          );
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
