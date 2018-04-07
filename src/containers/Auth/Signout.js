import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

class Signout extends Component {
  componentDidMount() {
    this.props.onSignoutUser();
  }

  render() {
    return <h5 className="text-center mt-2">Sorry to see you go...</h5>;
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
