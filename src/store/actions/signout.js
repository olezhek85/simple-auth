import * as actionTypes from "./actionTypes";

export const signoutUserStart = () => {
  return {
    type: actionTypes.SIGNOUT_USER_START
  };
};

export const signoutUserSuccess = () => {
  return {
    type: actionTypes.SIGNOUT_USER_SUCCESS
  };
};

export const signoutUserFail = error => {
  return {
    type: actionTypes.SIGNIN_USER_FAIL,
    error: error
  };
};

export const signoutUser = () => {
  return dispatch => {
    dispatch(signoutUserStart());
    try {
      sessionStorage.removeItem("token");
      dispatch(signoutUserSuccess());
    } catch (error) {
      dispatch(signoutUserFail(error));
    }
  };
};
