import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCourse } from "../../actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import Courses from "./courses.json";

class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: "",
      ch: "",
      teacher: "",
      semester: "",
      GPA: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const allCourses = Courses;

    let info = allCourses
      .filter(course => course.name === this.state.name)
      .map(course => course)[0];

    const newCourse = {
      name: this.state.name,
      code: info.code,
      ch: info.ch,
      teacher: this.state.teacher,
      semester: this.state.semester,
      gpa: this.state.GPA
    };

    this.props.addCourse(newCourse, this.props.history);
  }

  render() {
    const { errors } = this.state;
    let semester = null;

    const firstSemesterCourses = [
      { label: "* First Semester Courses", value: 0 }
    ];

    Courses.filter(course => course.sem === "first").map(course =>
      firstSemesterCourses.push({ label: course.name, value: course.name })
    );

    const secondSemesterCourses = [
      { label: "* Second Semester Courses", value: 0 }
    ];

    Courses.filter(course => course.sem === "second").map(course =>
      secondSemesterCourses.push({ label: course.name, value: course.name })
    );

    const thirdSemesterCourses = [
      { label: "* Third Semester Courses", value: 0 }
    ];

    Courses.filter(course => course.sem === "third").map(course =>
      thirdSemesterCourses.push({ label: course.name, value: course.name })
    );

    const fourthSemesterCourses = [
      { label: "* Fourth Semester Courses", value: 0 }
    ];

    Courses.filter(course => course.sem === "fourth").map(course =>
      fourthSemesterCourses.push({ label: course.name, value: course.name })
    );

    const fivthSemesterCourses = [
      { label: "* Fivth Semester Courses", value: 0 }
    ];

    Courses.filter(course => course.sem === "fivth").map(course =>
      fivthSemesterCourses.push({ label: course.name, value: course.name })
    );

    const sixthSemesterCourses = [
      { label: "* Sixth Semester Courses", value: 0 }
    ];

    Courses.filter(course => course.sem === "sixth").map(course =>
      sixthSemesterCourses.push({ label: course.name, value: course.name })
    );

    const seventhSemesterCourses = [
      { label: "* Seventh Semester Courses", value: 0 }
    ];

    Courses.filter(course => course.sem === "seventh").map(course =>
      seventhSemesterCourses.push({ label: course.name, value: course.name })
    );

    const finalSemesterCourses = [
      { label: "* Final Semester Courses", value: 0 }
    ];

    Courses.filter(course => course.sem === "final").map(course =>
      finalSemesterCourses.push({ label: course.name, value: course.name })
    );

    const semesterOptions = [
      { label: "* Course Semester", value: 0 },
      { label: "First Semester", value: "First" },
      { label: "Second Semester", value: "Second" },
      { label: "Third Semester", value: "Third" },
      { label: "Fourth Semester", value: "Fourth" },
      { label: "Fivth Semester", value: "Fivth" },
      { label: "Sixth Semester", value: "Sixth" }
      // { label: "Seventh Semester", value: "Seventh" },
      // { label: "Final Semester", value: "Final" }
    ];

    if (this.state.semester === "First") {
      semester = firstSemesterCourses;
    } else if (this.state.semester === "Second") {
      semester = secondSemesterCourses;
    } else if (this.state.semester === "Third") {
      semester = thirdSemesterCourses;
    } else if (this.state.semester === "Fourth") {
      semester = fourthSemesterCourses;
    } else if (this.state.semester === "Fivth") {
      semester = fivthSemesterCourses;
    } else if (this.state.semester === "Sixth") {
      semester = sixthSemesterCourses;
    } else if (this.state.semester === "Seventh") {
      semester = "";
    } else if (this.state.semester === "Final") {
      semester = "";
    }

    return (
      <div>
        <div className="add-course">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to="/profile/courses" className="btn btn-light">
                  Back to courses
                </Link>
                <h1 className="display-4 text-center">Add Course</h1>
                <p className="lead text-center">
                  Add a course to monitor its progress
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                  <SelectListGroup
                    name="semester"
                    value={this.state.semester}
                    error={errors.semester}
                    onChange={this.onChange}
                    options={semesterOptions}
                  />

                  {semester ? (
                    <SelectListGroup
                      name="name"
                      value={this.state.name}
                      error={errors.name}
                      onChange={this.onChange}
                      options={semester}
                    />
                  ) : (
                    ""
                  )}

                  <TextFieldGroup
                    name="teacher"
                    placeholder="* Course Teacher"
                    value={this.state.teacher}
                    error={errors.teacher}
                    onChange={this.onChange}
                  />

                  <TextFieldGroup
                    name="GPA"
                    placeholder="GPA (Optional)"
                    value={this.state.GPA}
                    error={errors.GPA}
                    onChange={this.onChange}
                  />

                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddCourse.propTypes = {
  errors: PropTypes.object.isRequired,
  addCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addCourse }
)(withRouter(AddCourse));
