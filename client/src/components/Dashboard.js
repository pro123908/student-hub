import React, { Component } from "react";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center">Welcome to Dashboard</h1>
        <div className="cotainer">
          <div className="row">
            <div className="col-md-12 m-auto text-center">
              <Link to="/profile/addCourse" className="btn btn-success">
                Add Course
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
