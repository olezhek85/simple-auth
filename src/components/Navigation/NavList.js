import React, { Fragment } from "react";

import { AuthContext } from "../../App";
import NavItem from "./NavItem";

export default () => (
  <Fragment>
    <div className="navbar-nav mr-auto" />
    <div className="navbar-nav">
      <NavItem exact link="/">
        Home
      </NavItem>
      <AuthContext.Consumer>
        {auth =>
          auth ? (
            <Fragment>
              <NavItem exact link="/feature">
                Feature
              </NavItem>
              <NavItem link="/signout">Sign out</NavItem>
            </Fragment>
          ) : (
            <Fragment>
              <NavItem link="/signin">Sign In</NavItem>
              <NavItem link="/signup">Sign Up</NavItem>
            </Fragment>
          )
        }
      </AuthContext.Consumer>
    </div>
  </Fragment>
);
