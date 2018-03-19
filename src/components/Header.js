import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const header = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        Redux Auth
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <div className="navbar-nav mr-auto" />
        <div className="navbar-nav">
          <NavLink exact to="/" className="nav-item nav-link">
            Home
          </NavLink>
          {props.isAuth ? (
            <NavLink to="/signout" className="nav-item nav-link">
              Sign out
            </NavLink>
          ) : (
            <Fragment>
              <NavLink to="/signin" className="nav-item nav-link">
                Sign In
              </NavLink>
              <NavLink to="/signup" className="nav-item nav-link">
                Sign Up
              </NavLink>
            </Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default header;
