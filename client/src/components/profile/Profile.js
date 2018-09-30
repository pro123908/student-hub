import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/isEmpty";

class Profile extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  capatilize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const { profile, loading } = this.props.profile;

    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      if (profile.noprofile) {
        profileContent = (
          <div className="row text-center">
            <div class="col-md-12">
              <h3 className="mb-4">Create your profile now</h3>
              <Link className="btn btn-large btn-info" to="/createProfile">
                Create Profile
              </Link>
            </div>
          </div>
        );
      } else {
        const userInfo = [
          "handle",
          "name",
          "university",
          "phone",
          "department",
          "semester",
          "year",
          "CGPA"
        ];
        const userInfoContent = userInfo.map(
          info =>
            isEmpty(profile[info]) ? null : (
              <div className="row">
                <div className="col-md-6">
                  <label>{this.capatilize(info)}</label>
                </div>
                <div className="col-md-6">
                  <p>{profile[info]}</p>
                </div>
              </div>
            )
        );
        profileContent = (
          <div>
            <div className="row">
              <div className="col-md-4">
                <div className="profile-img">
                  <img src={profile.avatar} alt="" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-head">
                  <span className="display-4">{profile.name}</span>
                  <span className="d-block text-muted">{profile.email}</span>
                </div>
              </div>
              <div className="col-md-2 mt-3">
                <Link className="btn btn-primary" to="/profile/editProfile">
                  Edit Profile
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4" />
              <div className="col-md-8">{userInfoContent}</div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfile }
)(Profile);
