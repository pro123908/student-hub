import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";

import TextFieldGroup from "../common/TextFieldGroup";
import Spinner from "../common/Spinner";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      isSubmit: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ isSubmit: false, errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
    this.setState({ isSubmit: true });
  }

  render() {
    const { errors } = this.state;

    let registerContent;

    if (this.state.isSubmit) {
      registerContent = <Spinner />;
    } else {
      registerContent = (
        <div>
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your Student Hub account</p>
          <form noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />

            <TextFieldGroup
              name="email"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
              info=" This site uses Gravatar so if you want a profile image, use
                  a Gravatar email"
            />

            <TextFieldGroup
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />

            <TextFieldGroup
              name="password2"
              type="password"
              placeholder="Confirm Password"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
            />

            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      );
    }

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">{registerContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
