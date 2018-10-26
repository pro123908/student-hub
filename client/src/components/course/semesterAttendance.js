import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getSemesterAttendance,
  deleteSemesterAttendance
} from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import Chart from "../layout/Chart";

class semesterAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.semesterAttendance) {
      let semesterAttendance = nextProps.profile.semesterAttendance;
      this.setState({
        chartData: {
          labels: ["Held", "Taken", "Left"],
          datasets: [
            {
              label: "Attendance",
              data: [
                semesterAttendance.classesHeld,
                semesterAttendance.classesTaken,
                semesterAttendance.classesLeft
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
    if (this.props.match.params.semester) {
      this.props.getSemesterAttendance(this.props.match.params.semester);
    }
  }

  onReset() {
    this.props.deleteSemesterAttendance(this.props.match.params.semester);
  }

  getPercentage(val1, val2) {
    let result = ((val1 * 100) / val2).toFixed(2);

    if (isNaN(result)) {
      return 0;
    }
    return result;
  }

  render() {
    const { semesterAttendance, loading } = this.props.profile;

    let semesterAttendanceContent;

    if (semesterAttendance === null || loading) {
      semesterAttendanceContent = <Spinner />;
    } else {
      semesterAttendanceContent = (
        <div>
          <Link to="/profile/courses" className="btn btn-light mb-4">
            Back to courses
          </Link>
          <div className="row">
            <h1 className="col-md-10">Semester Attendance</h1>
            <div className="col-md-2">
              <button
                onClick={this.onReset.bind(this)}
                className="btn btn-danger btn-lg"
              >
                Reset
              </button>
            </div>
          </div>

          <hr />
          <div className="row align-items-center">
            <div className="ml-4 col-md-4 ">
              <p className="lead text-primary">
                Held : {semesterAttendance.classesHeld}
              </p>
              <p className="lead text-success">
                Taken : {semesterAttendance.classesTaken}
              </p>
              <p className="lead text-danger">
                Left : {semesterAttendance.classesLeft}
              </p>
              <p className="lead text-secondary">
                Percentage :{" "}
                {this.getPercentage(
                  semesterAttendance.classesTaken,
                  semesterAttendance.classesHeld
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

    return <div>{semesterAttendanceContent}</div>;
  }
}

semesterAttendance.propTypes = {
  profile: PropTypes.object.isRequired,
  getSemesterAttendance: PropTypes.func.isRequired,
  deleteSemesterAttendance: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getSemesterAttendance, deleteSemesterAttendance }
)(semesterAttendance);
