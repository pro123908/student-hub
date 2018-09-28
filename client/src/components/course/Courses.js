import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getCourses } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import CourseItem from "./CourseItem";

class Courses extends Component {
  componentDidMount() {
    this.props.getCourses();
  }

  render() {
    const { courses, loading } = this.props.profile;

    let coursesContent;

    if (courses === null || loading) {
      coursesContent = (
        <div className="col-md-12 m-auto">
          <Spinner />
        </div>
      );
    } else {
      if (Object.keys(courses).length > 0) {
        const allCourses = courses.map((course, index) => (
          <CourseItem key={index} course={course} index={index} />
        ));

        coursesContent = (
          <div>
            <div className="row">
              <h2 className="col-md-10 mb-4">Courses</h2>
              <div className="col-md-2 ">
                <Link to="/addCourse" className="btn btn-success">
                  Add Course
                </Link>
              </div>
            </div>
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Credit Hours</th>
                  <th>Teacher</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>{allCourses}</tbody>
            </table>
          </div>
        );
      } else {
        coursesContent = (
          <div className="col-md-12 m-auto text-center">
            <h2>No Course Added</h2>
            <Link to="/addCourse" className="btn btn-success mt-2">
              Add Course
            </Link>
          </div>
        );
      }
    }

    return <div className="container">{coursesContent}</div>;
  }
}

Courses.propTypes = {
  profile: PropTypes.object.isRequired,
  getCourses: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCourses }
)(Courses);
