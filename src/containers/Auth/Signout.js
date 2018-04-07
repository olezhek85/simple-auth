import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner";

class Signout extends Component {
  componentDidMount() {
    this.props.onSignoutUser();
  }

  render() {
    let message = <h5 className="text-center mt-2">Sorry to see you go...</h5>;

    if (this.props.loading) {
      message = <Spinner />;
    }

    return message;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignoutUser: () => {
      dispatch(actions.signoutUser());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signout);
