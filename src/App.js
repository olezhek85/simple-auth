import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout";
import Signin from "./components/Auth/Signin";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" render={() => <p>Sign up</p>} />
        <Route path="/signout" render={() => <p>Sign out</p>} />
        <Route
          path="/"
          exact
          render={() => <h5 className="text-center mt-2">Welcome to React</h5>}
        />
        <Redirect to="/" />
      </Switch>
    );

    return <Layout>{routes}</Layout>;
  }
}

export default App;
