import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

class Signout extends Component {
  componentWillMount() {
    this.props.onSignoutUser();
  }

  render() {
    return <div>Sorry to see you go...</div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignoutUser: () => {
      dispatch(actions.signoutUser());
    }
  };
};

export default connect(null, mapDispatchToProps)(Signout);
