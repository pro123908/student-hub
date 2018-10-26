import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import CourseItem from "./CourseItem";
import { getCourses, getProfile } from "../../actions/profileActions";

class CoursesResults extends Component {
  componentDidMount() {
    this.props.getCourses();
    this.props.getProfile();
  }

  render() {
    const { profile, courses, loading } = this.props.profile;

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
          let isGPA = courses.filter(course => course.GPA !== 0);
          if (isGPA.length > 0) {
            let counter = 0;
            const allCourses = courses.map((course, index) => {
              if (course.GPA !== 0) {
                counter++;
                return (
                  <CourseItem
                    key={course._id}
                    course={course}
                    index={counter}
                    GPA={true}
                  />
                );
              }
              return "";
            });

            coursesContent = (
              <div>
                <div className="row">
                  <h2 className="col-md-8 mb-4">Courses Results</h2>
                  <div className="col-md-4 text-center">
                    <Link
                      to="/profile/courses/results/semester"
                      className="btn btn-success mr-2"
                    >
                      Semester Wise
                    </Link>
                  </div>
                </div>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Code</th>
                      <th className="text-center">Credit Hours</th>
                      <th>Teacher</th>
                      <th>Sem</th>
                      <th>GPA</th>
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
                <h2>No Results Added</h2>
                <Link to="/profile/courses" className="btn btn-success mt-2">
                  Courses
                </Link>
              </div>
            );
          }
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

CoursesResults.propTypes = {
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
)(CoursesResults);
