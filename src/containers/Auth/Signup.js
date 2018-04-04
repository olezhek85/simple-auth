import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import InputField from "../../components/UI/InputField";

class Signup extends Component {
  componentDidMount() {
    this.inputRef.current.focus();
  }

  inputRef = React.createRef();

  handleFormSubmit = ({ email, password }) => {
    this.props.onSignupUser(email, password);
  };

  render() {
    const { handleSubmit } = this.props;

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <div className="alert alert-danger" role="alert">
          <strong>Oops!</strong> {this.props.error}
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center mt-1">Sign up</h3>
          <div className="row">
            <div className="col-md-6 mx-auto">
              <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <InputField
                  name="email"
                  label="Email address"
                  type="text"
                  placeholder="Enter email"
                  ref={this.inputRef}
                />
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                />
                <InputField
                  name="passwordConfirm"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm Password"
                />
                {errorMessage}
                <button type="submit" className="btn btn-primary float-right">
                  Sign up!
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignupUser: (email, password) => {
      dispatch(actions.signupUser(email, password));
    }
  };
};

Signup = connect(mapStateToProps, mapDispatchToProps)(Signup);

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Please enter an email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Please enter a password";
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = "Please enter a password confirmation";
  }

  if (values.password !== values.passwordConfirm) {
    errors.password = "Passwords must match";
  }
  return errors;
};

export default reduxForm({
  form: "signup",
  validate
})(Signup);
