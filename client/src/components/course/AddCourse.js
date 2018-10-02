import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCourse } from "../../actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";

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

    const allCourses = [
      { name: "Calculus", code: "MT-173", ch: "3" },
      { name: "Pakistan Studies", code: "HS-105", ch: "2" },
      { name: "Functional English", code: "HS-104", ch: "3" },
      { name: "Fundamentals of IT", code: "CT-174", ch: "3" },
      { name: "Discrete Structures", code: "CT-162", ch: "3" },
      { name: "Programming Languages", code: "CT-153", ch: "3" },
      { name: "OOC & Programming", code: "SE-201", ch: "4" },
      { name: "Applied Physics", code: "PH-122", ch: "4" },
      { name: "Islamic Studies", code: "HS-205", ch: "2" },
      { name: "Basic Electronics", code: "EL-134", ch: "4" },
      { name: "DSA & Applications", code: "CT-157", ch: "4" },
      { name: "Software Engineering", code: "SE-207", ch: "3" },
      { name: "Computer Graphics", code: "SE-202", ch: "4" },
      {
        name: "Differential Equations & Linear Algebra",
        code: "MT-273",
        ch: "3"
      },
      { name: "Business Communication & Ethics", code: "HS-208", ch: "3" },
      { name: "Logic Design & Switching Theory", code: "CS-251", ch: "4" }
    ];

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
      { label: "* First Semester Courses", value: 0 },
      { label: "Calculus", value: "Calculus" },
      { label: "Pakistan Studies", value: "Pakistan Studies" },
      { label: "Functional English", value: "Functional English" },
      { label: "Fundamentals of IT", value: "Fundamentals of IT" },
      { label: "Discrete Structures", value: "Discrete Structures" },
      { label: "Programming Languages", value: "Programming Languages" }
    ];

    const secondSemesterCourses = [
      { label: "* Second Semester Courses", value: 0 },
      { label: "OOC & Programming", value: "OOC & Programming" },
      { label: "Applied Physics", value: "Applied Physics" },
      { label: "Islamic Studies", value: "Islamic Studies" },
      { label: "Basic Electronics", value: "Basic Electronics" },
      { label: "DSA & Applications", value: "DSA & Applications" }
    ];

    const thirdSemesterCourses = [
      { label: "* Third Semester Courses", value: 0 },
      { label: "Software Engineering", value: "Software Engineering" },
      { label: "Computer Graphics", value: "Computer Graphics" },
      {
        label: "Differential Equations & Linear Algebra",
        value: "Differential Equations & Linear Algebra"
      },
      {
        label: "Business Communication & Ethics	",
        value: "Business Communication & Ethics	"
      },
      {
        label: "Logic Design & Switching Theory	",
        value: "Logic Design & Switching Theory	"
      }
    ];

    const semesterOptions = [
      { label: "* Course Semester", value: 0 },
      { label: "First Semester", value: "First" },
      { label: "Second Semester", value: "Second" },
      { label: "Third Semester", value: "Third" },
      { label: "Fourth Semester", value: "Fourth" },
      { label: "Fiveth Semester", value: "Fiveth" },
      { label: "Sixth Semester", value: "Sixth" },
      { label: "Seventh Semester", value: "Seventh" },
      { label: "Final Semester", value: "Final" }
    ];

    if (this.state.semester === "First") {
      semester = firstSemesterCourses;
    } else if (this.state.semester === "Second") {
      semester = secondSemesterCourses;
    } else if (this.state.semester === "Third") {
      semester = thirdSemesterCourses;
    } else if (this.state.semester === "Fourth") {
      semester = "";
    } else if (this.state.semester === "Fiveth") {
      semester = "";
    } else if (this.state.semester === "Sixth") {
      semester = "";
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

                  {/* <TextFieldGroup
                    name="name"
                    placeholder="* Course Name"
                    value={this.state.name}
                    error={errors.name}
                    onChange={this.onChange}
                  /> */}

                  {/* <TextFieldGroup
                    name="code"
                    placeholder="* Course Code"
                    value={this.state.code}
                    error={errors.code}
                    onChange={this.onChange}
                  /> */}

                  {/* <TextFieldGroup
                    name="ch"
                    placeholder="* Credit Hours"
                    value={this.state.ch}
                    error={errors.ch}
                    onChange={this.onChange}
                  /> */}

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
