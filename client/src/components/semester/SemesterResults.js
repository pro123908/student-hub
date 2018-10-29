import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getCourses, getProfile } from "../../actions/profileActions";
import Chart from "../layout/Chart";
import Check from "../Check";
import CourseRender from "../CourseRender";

class SemesterResults extends Component {
  componentDidMount() {
    this.props.getCourses();
    this.props.getProfile();
  }

  getSemestersGPA(courses) {
    let firstSemGPA = this.getCGPA(
      courses.filter(course => course.semester === "First")
    );
    let secondSemGPA = this.getCGPA(
      courses.filter(course => course.semester === "Second")
    );

    let thirdSemGPA = this.getCGPA(
      courses.filter(course => course.semester === "Third")
    );

    let fourthSemGPA = this.getCGPA(
      courses.filter(course => course.semester === "Fourth")
    );

    return {
      firstSemGPA,
      secondSemGPA,
      thirdSemGPA,
      fourthSemGPA
    };
  }

  drawChart(gpaCourses) {
    const {
      firstSemGPA,
      secondSemGPA,
      thirdSemGPA,
      fourthSemGPA
    } = this.getSemestersGPA(gpaCourses);

    let chartData = {
      labels: ["1st", "2nd", "3rd", "4th"],
      datasets: [
        {
          label: "Result",
          data: [firstSemGPA, secondSemGPA, thirdSemGPA, fourthSemGPA, 2],
          backgroundColor: [
            "rgba(0, 123, 255,0.8)",
            "rgba(40, 167, 69,0.8)",
            "rgba(220, 53, 69,0.8)",
            "rgba(255, 193, 7,0.8)"
          ]
        }
      ]
    };

    return <Chart chartData={chartData} type="Bar" height={100} />;
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
    let CGPA = null,
      chart;

    if (profile === null) {
      semesterContent = <Check  flag={1}/>
    } else if (profile.noprofile) {
      semesterContent = <Check  flag={2}/>
    } else {
      if (courses === null || loading) {
        semesterContent = <Check  flag={1}/>
      } else {
        if (Object.keys(courses).length > 0) {
          const gpaCourses = courses.filter(course => course.GPA !== 0);
          if (gpaCourses.length > 0) {
            chart = this.drawChart(gpaCourses);
            CGPA = this.getCGPA(gpaCourses);
          }

         let courseRender =  <CourseRender courses={gpaCourses} flag={1} /> 


          semesterContent = (
            <div>
              {CGPA ? (
                <div className="row">
                  <div className="col-md-8 mb-3">
                    <h1 className="text-center-res">Semester Results</h1>
                  </div>
                </div>
              ) : (
                ""
              )}
              {courseRender}
            
              {CGPA ? (
                <div>
                  <div className="row">
                    <div className="col md-12 m-auto text-center">
                      <h1>Overall CGPA : {CGPA}</h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 ">{chart}</div>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col md-12 m-auto text-center">
                    <h1>No Results</h1>
                  </div>
                </div>
              )}
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
