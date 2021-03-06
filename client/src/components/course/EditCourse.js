import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editCourse, getCourse } from "../../actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import Courses from "./courses.json";
import Check from "../Check";

class EditCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: "",
      ch: "",
      teacher: "",
      GPA: "",
      semester: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.courseID) {
      this.props.getCourse(this.props.match.params.courseID);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.course) {
      let course = nextProps.profile.course;

      this.setState({
        name: course.name,
        code: course.code,
        ch: course.ch,
        teacher: course.teacher,
        semester: course.semester,
        GPA: course.GPA ? course.GPA : ""
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    let gpa = null;

    if (this.state.GPA) {
      let result = Courses.filter(
        course => course.name === this.state.name
      ).map(course => course.ch);

      gpa = parseFloat(this.state.GPA) / parseInt(result,10);
    }

    const editCourse = {
      name: this.state.name,
      code: this.state.code,
      ch: this.state.ch,
      teacher: this.state.teacher,
      semester: this.state.semester,
      gpa: gpa ? gpa : ""
    };

    this.props.editCourse(
      editCourse,
      this.props.match.params.courseID,
      this.props.history
    );
  }

  render() {
    const { errors } = this.state;
    const { course, loading } = this.props.profile;

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

    let editCourseContent;
    if (course === null || loading) {
      editCourseContent = <Check flag={1} />
    } else {
      editCourseContent = (
      <div className='row'>
        <div className="col-md-8 m-auto">
          <Link to="/profile/courses" className="btn btn-light">
            Back to courses
          </Link>
          <h1 className="display-4 text-center">Edit Course</h1>
          <p className="lead text-center">
            Edit course to monitor its progress
          </p>
          <form noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup
              name="name"
              placeholder="* Course Name"
              value={this.state.name}
              error={errors.name}
              onChange={this.onChange}
            />

            <TextFieldGroup
              name="code"
              placeholder="* Course Code"
              value={this.state.code}
              error={errors.code}
              onChange={this.onChange}
            />

            <TextFieldGroup
              name="ch"
              placeholder="* Credit Hours"
              value={this.state.ch}
              error={errors.ch}
              onChange={this.onChange}
            />

            <TextFieldGroup
              name="teacher"
              placeholder="* Course Teacher"
              value={this.state.teacher}
              error={errors.teacher}
              onChange={this.onChange}
            />

            <SelectListGroup
              name="semester"
              value={this.state.semester}
              error={errors.semester}
              onChange={this.onChange}
              options={semesterOptions}
            />

            <TextFieldGroup
              name="GPA"
              placeholder="GPs (Optional)"
              value={this.state.GPA}
              error={errors.GPA}
              onChange={this.onChange}
            />

            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
        
      );
    }
    return (
      <div>
        <div className="add-course">
          <div className="container">
            {editCourseContent}
          </div>
        </div>
      </div>
    );
  }
}

EditCourse.propTypes = {
  errors: PropTypes.object.isRequired,
  editCourse: PropTypes.func.isRequired,
  getCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { editCourse, getCourse }
)(withRouter(EditCourse));
