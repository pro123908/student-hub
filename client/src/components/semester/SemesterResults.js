import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getCourses, getProfile } from "../../actions/profileActions";
import SemesterResult from "./SemesterResult";
import Spinner from "../common/Spinner";

class SemesterResults extends Component {
  componentDidMount() {
    this.props.getCourses();
    this.props.getProfile();
  }

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
    const { courses, loading, profile } = this.props.profile;

    let semesterContent;
    let CGPA = "";

    if (profile === null) {
      semesterContent = (
        <div className="col-md-12 m-auto">
          <Spinner />
        </div>
      );
    } else if (profile.noprofile) {
      semesterContent = (
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
        semesterContent = (
          <div className="col-md-8 m-auto">
            <Spinner />
          </div>
        );
      } else {
        if (Object.keys(courses).length > 0) {
          const gpaCourses = courses.filter(course => course.GPA !== 0);
          CGPA = this.getCGPA(gpaCourses);

          let firstSemester = gpaCourses.filter(
            course => course.semester === "First"
          );
          let secondSemester = gpaCourses.filter(
            course => course.semester === "Second"
          );
          let thirdSemester = gpaCourses.filter(
            course => course.semester === "Third"
          );
          let fourthSemester = gpaCourses.filter(
            course => course.semester === "Fourth"
          );
          let fivethSemester = gpaCourses.filter(
            course => course.semester === "Fiveth"
          );
          let sixthSemester = gpaCourses.filter(
            course => course.semester === "Sixth"
          );
          let seventhSemester = gpaCourses.filter(
            course => course.semester === "Seventh"
          );
          let finalSemester = gpaCourses.filter(
            course => course.semester === "Final"
          );

          semesterContent = (
            <div>
              <div className="row">
                <div className="col-md-8 mb-3">
                  <h1>Semester Results</h1>
                </div>
              </div>
              {firstSemester.length !== 0 ? (
                <SemesterResult semesterName="First" course={firstSemester} />
              ) : (
                ""
              )}
              {secondSemester.length !== 0 ? (
                <SemesterResult semesterName="Second" course={secondSemester} />
              ) : (
                ""
              )}
              {thirdSemester.length !== 0 ? (
                <SemesterResult semesterName="Third" course={thirdSemester} />
              ) : (
                ""
              )}
              {fourthSemester.length !== 0 ? (
                <SemesterResult semesterName="Fourth" course={fourthSemester} />
              ) : (
                ""
              )}
              {fivethSemester.length !== 0 ? (
                <SemesterResult semesterName="Fiveth" course={fivethSemester} />
              ) : (
                ""
              )}
              {sixthSemester.length !== 0 ? (
                <SemesterResult semesterName="Sixth" course={sixthSemester} />
              ) : (
                ""
              )}
              {seventhSemester.length !== 0 ? (
                <SemesterResult
                  semesterName="Seventh"
                  course={seventhSemester}
                />
              ) : (
                ""
              )}
              {finalSemester.length !== 0 ? (
                <SemesterResult semesterName="Final" course={finalSemester} />
              ) : (
                ""
              )}
              <div className="row">
                <div className="col md-12 m-auto text-center">
                  <h1>Overall CGPA : {CGPA}</h1>
                </div>
              </div>
            </div>
          );
        } else {
          semesterContent = (
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

    return (
      <div className="semester-result">
        <div className="container">{semesterContent}</div>
      </div>
    );
  }
}

SemesterResults.propTypes = {
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
)(SemesterResults);
