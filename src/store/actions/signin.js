import axios from "axios";

import * as actionTypes from "./actionTypes";

const ROOT_URL =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCKFAB17VvlMONffRcW4puBYkQpOmf8rTw";

export const signinUserStart = () => {
  return {
    type: actionTypes.SIGNIN_USER_START
  };
};

export const signinUserSuccess = (token, userId) => {
  return {
    type: actionTypes.SIGNIN_USER_SUCCESS,
    token,
    userId
  };
};

export const signinUserFail = error => {
  return {
    type: actionTypes.SIGNIN_USER_FAIL,
    error: error
  };
};

export const signinUser = (email, password) => {
  return async dispatch => {
    dispatch(signinUserStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    try {
      const response = await axios.post(ROOT_URL, authData);
      dispatch(signinUserSuccess(response.data.idToken, response.data.localId));
    } catch (error) {
      dispatch(signinUserFail(error.response.data.error));
    }
  };
};
