import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout";
import Signin from "./containers/Auth/Signin";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" render={() => <p>Sign up</p>} />
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
          <Route path="/signout" render={() => <p>Sign out</p>} />
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
