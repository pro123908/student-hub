import React, { Component } from "react";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
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
              <p className="lead">Check Overall Attendance</p>
              <Link
                to="/profile/courses/attendance"
                className="btn btn-success"
              >
                Attendance
              </Link>
            </div>
            <div className="col-md-12 mt-4">
              <p className="lead">Check your profile</p>
              <Link to="/profile" className="btn btn-success">
                Profile
              </Link>
            </div>
            <div className="col-md-12 mt-4">
              <p className="lead">Check courses results</p>
              <Link to="/profile/courses/results" className="btn btn-success">
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
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
