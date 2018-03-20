import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout";
import Signin from "./containers/Auth/Signin";
import Signout from "./containers/Auth/Signout";
import Signup from "./containers/Auth/Signup";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/signout" component={Signout} />
        <Route
          path="/"
          exact
          render={() => <h5 className="text-center mt-2">Welcome to React</h5>}
        />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/signout" component={Signout} />
          <Route
            path="/"
            exact
            render={() => (
              <h5 className="text-center mt-2">Welcome to React</h5>
            )}
          />
          <Redirect to="/" />
        </Switch>
      );
    }

    return <Layout isAuth={this.props.isAuthenticated}>{routes}</Layout>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated
  };
};

export default withRouter(connect(mapStateToProps)(App));
