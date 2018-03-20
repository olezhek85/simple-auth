import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

const renderInput = field => (
  <Fragment>
    <input
      {...field.input}
      type={field.type}
      className={field.className}
      placeholder={field.placeholder}
      autoFocus={field.autoFocus}
    />
    {field.meta.touched &&
      field.meta.error && <span className="error">{field.meta.error}</span>}
  </Fragment>
);

class Signup extends Component {
  handleFormSubmit = ({ email, password }) => {
    console.log(email, password);
    this.props.onSignupUser(email, password);
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
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <Field
                    name="email"
                    component={renderInput}
                    type="text"
                    className="form-control"
                    placeholder="Enter email"
                    autoFocus
                  />
                  <small className="form-text text-muted">
                    {"We'll never share your email with anyone else."}
                  </small>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    component={renderInput}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="passwordConfirm">Confirm Password</label>
                  <Field
                    name="passwordConfirm"
                    component={renderInput}
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                </div>
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

export default reduxForm({
  form: "signup"
})(Signup);
