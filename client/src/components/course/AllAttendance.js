import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOverallAttendance } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

class AllAttendance extends Component {
  componentDidMount() {
    this.props.getOverallAttendance();
  }

  getPercentage(val1, val2) {
    let result = ((val1 * 100) / val2).toFixed(2);

    if (isNaN(result)) {
      return 0;
    }
    return result;
  }

  render() {
    const { allAttendance, loading } = this.props.profile;

    let allAttendanceContent;

    if (allAttendance === null || loading) {
      allAttendanceContent = <Spinner />;
    } else {
      allAttendanceContent = (
        <div>
          <h1 className="mb-4">Overall Attendance</h1>
          <hr />
          <div className="ml-4">
            <p className="lead text-primary">
              Held : {allAttendance.classesHeld}
            </p>
            <p className="lead text-success">
              Taken : {allAttendance.classesTaken}
            </p>
            <p className="lead text-danger">
              Left : {allAttendance.classesLeft}
            </p>
            <p className="lead text-secondary">
              Percentage :{" "}
              {this.getPercentage(
                allAttendance.classesTaken,
                allAttendance.classesHeld
              )}
              %
            </p>
          </div>
          <hr />
          <div>
            <h4 className="mb-3">Check Individual Attendances</h4>
            <Link to="/profile/courses" className="btn btn-info">
              Attendances
            </Link>
          </div>
        </div>
      );
    }

    return <div>{allAttendanceContent}</div>;
  }
}

AllAttendance.propTypes = {
  profile: PropTypes.object.isRequired,
  getOverallAttendance: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getOverallAttendance }
)(AllAttendance);
