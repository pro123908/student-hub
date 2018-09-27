import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createProfile, getProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import isEmpty from "../../validation/isEmpty";
import Spinner from "../common/Spinner";

class editProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      handle: "",
      university: "",
      department: "",
      year: "",
      semester: "",
      phone: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      let profile = nextProps.profile.profile;

      profile.handle = !isEmpty(profile.handle) ? profile.handle : "";
      profile.university = !isEmpty(profile.university)
        ? profile.university
        : "";
      profile.department = !isEmpty(profile.department)
        ? profile.department
        : "";
      profile.year = !isEmpty(profile.year) ? profile.year : "";
      profile.semester = !isEmpty(profile.semester) ? profile.semester : "";
      profile.phone = !isEmpty(profile.phone) ? profile.phone : "";

      this.setState({
        handle: profile.handle,
        university: profile.university,
        department: profile.department,
        year: profile.year,
        semester: profile.semester,
        phone: profile.phone
      });
    }
  }

  componentDidMount() {
    this.props.getProfile();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      university: this.state.university,
      department: this.state.department,
      year: this.state.year,
      semester: this.state.semester,
      phone: this.state.phone
    };

    this.props.createProfile(profileData, this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { profile, loading } = this.props.profile;

    const yearOptions = [
      { label: "* Select your year", value: 0 },
      { label: "First Year", value: "First Year" },
      { label: "Second Year", value: "Second Year" },
      { label: "Third Year", value: "Third Year" },
      { label: "Final Year", value: "Final Year" }
    ];

    const semesterOptions = [
      { label: "* Select your semester", value: 0 },
      { label: "First Semester", value: "First Semester" },
      { label: "Second Semester", value: "Second Semester" },
      { label: "Third Semester", value: "Third Semester" },
      { label: "Fourth Semester", value: "Fourth Semester" },
      { label: "Fiveth Semester", value: "Fiveth Semester" },
      { label: "Sixth Semester", value: "Sixth Semester" },
      { label: "Seventh Semester", value: "Seventh Semester" },
      { label: "Final Semester", value: "Final Semester" }
    ];

    let editProfileContent;

    if (profile === null || loading) {
      editProfileContent = (
        <div className="col-md-8 m-auto">
          <Spinner />
        </div>
      );
    } else {
      editProfileContent = (
        <div className="col-md-8 m-auto">
          <Link to="/dashboard" className="btn btn-light">
            Back to Dashboard
          </Link>
          <h1 className="display-4 text-center">Edit Your Profile</h1>
          <p className="lead text-center">
            Let's get some information to make your profile stand out
          </p>
          <small className="d-block pb-3">* = required Fields</small>
          <form noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup
              name="handle"
              placeholder="* Profile Handle"
              value={this.state.handle}
              error={errors.handle}
              onChange={this.onChange}
            />

            <TextFieldGroup
              name="university"
              placeholder="* University Name"
              value={this.state.university}
              error={errors.university}
              onChange={this.onChange}
            />

            <TextFieldGroup
              name="department"
              placeholder="* Department Name"
              value={this.state.department}
              error={errors.department}
              onChange={this.onChange}
            />

            <SelectListGroup
              name="year"
              value={this.state.year}
              error={errors.year}
              onChange={this.onChange}
              options={yearOptions}
            />

            <SelectListGroup
              name="semester"
              value={this.state.semester}
              error={errors.semester}
              onChange={this.onChange}
              options={semesterOptions}
            />

            <TextFieldGroup
              name="phone"
              type="number"
              placeholder="Phone Number"
              value={this.state.phone}
              error={errors.phone}
              onChange={this.onChange}
            />
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">{editProfileContent}</div>
        </div>
      </div>
    );
  }
}

editProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getProfile }
)(withRouter(editProfile));
