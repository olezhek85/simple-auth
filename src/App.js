import React, { Component } from "react";

import Layout from "./hoc/Layout";

class App extends Component {
  render() {
    return (
      <Layout>
        <h5 className="text-center mt-2">Welcome to React</h5>
      </Layout>
    );
  }
}

export default App;
