import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_deocode from "jwt-decode";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import Dashboard from "./components/Dashboard";
import CreateProfile from "./components/profile/CreateProfile";
import editProfile from "./components/profile/editProfile";
import Profile from "./components/profile/Profile";

import AddCourse from "./components/course/AddCourse";
import Courses from "./components/course/Courses";
import CourseAttendance from "./components/course/CourseAttendance";
import AllAttendance from "./components/course/AllAttendance";
import CoursesResults from "./components/course/CoursesResults";
import EditCourse from "./components/course/EditCourse";

import SemesterResults from "./components/semester/SemesterResults";

import store from "./store";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import "./App.css";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decodedData = jwt_deocode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decodedData));

  const currentTime = Date.now() / 1000;
  if (decodedData.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/createProfile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/profile/editProfile"
                  component={editProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/profile" component={Profile} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/profile/addCourse"
                  component={AddCourse}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/profile/courses"
                  component={Courses}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/profile/courses/attendance/:courseID"
                  component={CourseAttendance}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/profile/courses/attendance"
                  component={AllAttendance}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/profile/courses/results"
                  component={CoursesResults}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/profile/courses/edit/:courseID"
                  component={EditCourse}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/profile/courses/results/semester"
                  component={SemesterResults}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
