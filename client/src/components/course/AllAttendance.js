import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getOverallAttendance } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import getPercentage from "../../functions/getPercentage";
import Chart from "../layout/Chart";

class AllAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.allAttendance) {
      let allAttendance = nextProps.profile.allAttendance;
      this.setState({
        chartData: {
          labels: ["Held", "Taken", "Left"],
          datasets: [
            {
              label: "Attendance",
              data: [
                allAttendance.classesHeld,
                allAttendance.classesTaken,
                allAttendance.classesLeft
              ],
              backgroundColor: [
                "rgba(0, 123, 255,0.8)",
                "rgba(40, 167, 69,0.8)",
                "rgba(220, 53, 69,0.8)"
              ]
            }
          ]
        }
      });
    }
  }

  componentDidMount() {
    this.props.getOverallAttendance();
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
          <div className="row align-items-center">
            <div className="ml-4 col-md-4">
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
                {getPercentage(
                  allAttendance.classesTaken,
                  allAttendance.classesHeld
                )}
                %
              </p>
            </div>
            <div className="col-md-6">
              <Chart height={100} chartData={this.state.chartData} />
            </div>
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
