import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_deocode from "jwt-decode";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import store from "./store";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

import "./App.css";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decodedData = jwt_deocode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decodedData));
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
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
