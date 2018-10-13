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
      { name: "Logic Design & Switching Theory", code: "CS-251", ch: "4" },
      { name: "Computer Architecture & Organization", code: "CS-252", ch: "4" },
      { name: "Financial & Cost Accounting", code: "CT-258", ch: "3" },
      { name: "Software Requirement Engineering", code: "SE-208", ch: "3" },
      { name: "Database Management Systems", code: "SE-204", ch: "4" },
      { name: "Web Engineering", code: "SE-206", ch: "4" },
      { name: "Applied Economics For Engineers", code: "IF-301", ch: "3" },
      { name: "Probability & Statistics", code: "MT-331", ch: "3" },
      { name: "Software Design & Architecture", code: "SE-308", ch: "3" },
      { name: "Human Computer Interaction", code: "SE-302", ch: "3" },
      { name: "Operating Systems", code: "SE-303", ch: "4" },
      { name: "Computer Communication Networks", code: "CS-351", ch: "4" },
      {
        name: "Artificial Intelligence & Expert Systems",
        code: "CT-361",
        ch: "4"
      },
      { name: "Software Quality Engineering", code: "SE-309", ch: "3" },
      { name: "Software Project Management", code: "SE-310", ch: "3" },
      { name: "E-Commerce", code: "SE-311", ch: "3" }
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

    const fourthSemesterCourses = [
      { label: "* Fourth Semester Courses", value: 0 },
      {
        label: "Computer Architecture & Organization",
        value: "Computer Architecture & Organization"
      },
      {
        label: "Financial & Cost Accounting",
        value: "Financial & Cost Accounting"
      },
      {
        label: "Software Requirement Engineering",
        value: "Software Requirement Engineering"
      },
      {
        label: "Database Management Systems",
        value: "Database Management Systems"
      },
      {
        label: "Web Engineering",
        value: "Web Engineering"
      }
    ];

    const fivthSemesterCourses = [
      { label: "* Fivth Semester Courses", value: 0 },
      {
        label: "Applied Economics For Engineers",
        value: "Applied Economics For Engineers"
      },
      {
        label: "Probability & Statistics",
        value: "Probability & Statistics"
      },
      {
        label: "Software Design & Architecture",
        value: "Software Design & Architecture"
      },
      {
        label: "Human Computer Interaction",
        value: "Human Computer Interaction"
      },
      {
        label: "Operating Systems",
        value: "Operating Systems"
      }
    ];

    const sixthSemesterCourses = [
      { label: "* Sixth Semester Courses", value: 0 },
      {
        label: "Computer Communication Networks",
        value: "Computer Communication Networks"
      },
      {
        label: "Artificial Intelligence & Expert Systems",
        value: "Artificial Intelligence & Expert Systems"
      },
      {
        label: "Software Quality Engineering",
        value: "Software Quality Engineering"
      },
      {
        label: "Software Project Management",
        value: "Software Project Management"
      },
      {
        label: "E-Commerce",
        value: "E-Commerce"
      }
    ];

    const seventhSemesterCourses = [
      { label: "* Seventh Semester Courses", value: 0 },
      {
        label: "Network & Information Security",
        value: "Network & Information Security"
      },
      {
        label: "Distributed Computing",
        value: "Distributed Computing"
      },
      {
        label: "Modeling & Simulation",
        value: "Modeling & Simulation"
      },
      {
        label: "Data Warehousing & Minning",
        value: "Data Warehousing & Minning"
      },
      {
        label: "Software Engineering Project",
        value: "Software Engineering Project"
      }
    ];

    const finalSemesterCourses = [
      { label: "* Final Semester Courses", value: 0 },
      {
        label: "Entrepreneruship",
        value: "Entrepreneruship"
      },
      {
        label: "Numerical Method",
        value: "Numerical Method"
      },
      {
        label: "Design Patterns",
        value: "Design Patterns"
      },
      {
        label: "Software Testing, Strategies & Techniques (Elective)",
        value: "Software Testing, Strategies & Techniques"
      },
      {
        label: "Software Reliability Engineering  (Elective)",
        value: "Software Reliability Engineering"
      },
      {
        label: "Information Systems Engineering  (Elective)",
        value: "Information Systems Engineering"
      },
      {
        label: "Software Engineering Project",
        value: "Software Engineering Project"
      }
    ];

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
