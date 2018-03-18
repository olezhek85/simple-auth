import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";

const renderInput = field => (
  <Fragment>
    <input
      {...field.input}
      type={field.type}
      className={field.className}
      placeholder={field.placeholder}
    />
    {field.meta.touched &&
      field.meta.error && <span className="error">{field.meta.error}</span>}
  </Fragment>
);

class Signin extends Component {
  handleFormSubmit = ({ email, password }) => {
    console.log(email, password);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center mt-1">Sign in</h3>
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
                  />
                  <small className="form-text text-muted">
                    We'll never share your email with anyone else.
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
                <button type="submit" className="btn btn-primary float-right">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: "signin"
})(Signin);
