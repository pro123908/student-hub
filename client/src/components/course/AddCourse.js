import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCourse } from "../../actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";

class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: "",
      ch: "",
      teacher: "",
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

    const newCourse = {
      name: this.state.name,
      code: this.state.code,
      ch: this.state.ch,
      teacher: this.state.teacher
    };

    this.props.addCourse(newCourse, this.props.history);
  }

  render() {
    const { errors } = this.state;
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
