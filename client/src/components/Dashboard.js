import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfile, getCourses } from "../actions/profileActions";
import Spinner from "./common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProfile();
    this.props.getCourses();
  }
  render() {
    const { profile, loading, courses } = this.props.profile;

    let dashboardContent;
    let coursesResult = true;

    if (profile === null || courses === null || loading) {
      dashboardContent = (
        <div className="row">
          <div className="col-md-12 m-auto">
            <Spinner />
          </div>
        </div>
      );
    } else {
      if (profile.noprofile) {
        dashboardContent = (
          <div className="row text-center">
            <div class="col-md-12">
              <h3 className="mb-4">Create Your Profile</h3>
              <Link className="btn btn-large btn-info" to="/createProfile">
                Create Profile
              </Link>
            </div>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <h1 className="text-center">Welcome to Dashboard</h1>
            <div className="cotainer">
              <div className="row">
                <div className="col-md-12">
                  <p className="lead">View Courses</p>
                  <Link to="/profile/courses" className="btn btn-success">
                    View Courses
                  </Link>
                </div>

                <div className="col-md-12 mt-4">
                  <p className="lead">Check your profile</p>
                  <Link to="/profile" className="btn btn-success">
                    Profile
                  </Link>
                </div>
                {Object.keys(courses).length > 0 ? (
                  <div>
                    <div className="col-md-12 mt-4">
                      <p className="lead">Check courses results</p>
                      <Link
                        to="/profile/courses/results"
                        className="btn btn-success"
                      >
                        Results
                      </Link>
                    </div>
                    <div className="col-md-12 mt-4">
                      <p className="lead">Check semester wise results</p>
                      <Link
                        to="/profile/courses/results/semester"
                        className="btn btn-success"
                      >
                        Results
                      </Link>
                    </div>
                    <div className="col-md-12 mt-4">
                      <p className="lead">Check Overall Attendance</p>
                      <Link
                        to="/profile/courses/attendance"
                        className="btn btn-success"
                      >
                        Attendance
                      </Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        );
      }
    }

    return <div>{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfile, getCourses }
)(Dashboard);
