import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getCourses, deleteCourse } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import CourseItem from "./CourseItem";

class Courses extends Component {
  componentDidMount() {
    this.props.getCourses();
  }

  onDelete(id) {
    this.props.deleteCourse(id);
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
          <CourseItem
            key={course._id}
            course={course}
            index={index}
            onDelete={this.onDelete.bind(this)}
            attendance={true}
          />
        ));

        coursesContent = (
          <div>
            <div className="row">
              <h2 className="col-md-6 mb-4">Courses</h2>
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
            <table className="table table-sm table-responsive-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Credit Hours</th>
                  <th>Teacher</th>
                  <th>Sem</th>
                  <th>Attendance</th>
                  <th>Actions</th>
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
            <Link to="/profile/addCourse" className="btn btn-success mt-2">
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
  getCourses: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCourses, deleteCourse }
)(Courses);
