import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout";
import Signin from "./containers/Auth/Signin";
import Signout from "./containers/Auth/Signout";
import Signup from "./containers/Auth/Signup";
import Feature from "./components/Feature";
import Welcome from "./components/Welcome";

import * as actions from "./store/actions";

export const AuthContext = React.createContext(false);

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/signout" component={Signout} />
        <Route path="/" exact component={Welcome} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/feature" component={Feature} />
          <Route path="/signout" component={Signout} />
          <Route path="/" exact component={Welcome} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <AuthContext.Provider value={this.props.isAuthenticated}>
        <Layout>{routes}</Layout>
      </AuthContext.Provider>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
