import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

const renderInput = ({
  input,
  label,
  type,
  className,
  placeholder,
  autoFocus,
  meta: { touched, error }
}) => {
  const classes = [];
  classes.push(className);

  let validationMessage = null;

  if (touched && error) {
    classes.push("is-invalid");
    validationMessage = <div className="invalid-feedback">{error}</div>;
  }

  return (
    <div className="form-group">
      <label htmlFor={input.name}>{label}</label>
      <input
        {...input}
        type={type}
        className={classes.join(" ")}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
      {validationMessage}
    </div>
  );
};

class Signup extends Component {
  handleFormSubmit = ({ email, password }) => {
    console.log(email, password);
    // this.props.onSignupUser(email, password);
  };

  render() {
    const { handleSubmit } = this.props;

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <div className="alert alert-danger" role="alert">
          <strong>Oops!</strong> {this.props.error.message}
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
                <Field
                  name="email"
                  label="Email address"
                  component={renderInput}
                  type="text"
                  className="form-control"
                  placeholder="Enter email"
                  autoFocus
                />
                <Field
                  name="password"
                  label="Password"
                  component={renderInput}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
                <Field
                  name="passwordConfirm"
                  label="Confirm Password"
                  component={renderInput}
                  type="password"
                  className="form-control"
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

// const mapDispatchToProps = dispatch => {
//   return {
//     onSignupUser: (email, password) => {
//       dispatch(actions.signupUser(email, password));
//     }
//   };
// };

Signup = connect(mapStateToProps)(Signup);

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
