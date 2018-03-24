import axios from "axios";

import * as actionTypes from "./actionTypes";

const ROOT_URL =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCKFAB17VvlMONffRcW4puBYkQpOmf8rTw";

export const signupUserStart = () => {
  return {
    type: actionTypes.SIGNUP_USER_START
  };
};

export const signupUserSuccess = (token, userId) => {
  return {
    type: actionTypes.SIGNUP_USER_SUCCESS,
    token,
    userId
  };
};

export const signupUserFail = error => {
  return {
    type: actionTypes.SIGNUP_USER_FAIL,
    error: error
  };
};

export const signupUser = (email, password) => {
  return async dispatch => {
    dispatch(signupUserStart());
    const authData = {
      email,
      password
    };
    try {
      const response = await axios.post(ROOT_URL, authData);
      dispatch(signupUserSuccess(response.data.idToken, response.data.localId));
    } catch (error) {
      dispatch(signupUserFail(error.response.data.error));
    }
  };
};
