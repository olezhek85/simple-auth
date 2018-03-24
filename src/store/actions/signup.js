import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./index";

const ROOT_URL =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCKFAB17VvlMONffRcW4puBYkQpOmf8rTw";

export const signupUserStart = () => {
  return {
    type: actionTypes.SIGNUP_USER_START
  };
};

export const signupUserSuccess = () => {
  return {
    type: actionTypes.SIGNUP_USER_SUCCESS
  };
};

export const signupUserFail = error => {
  return {
    type: actionTypes.SIGNUP_USER_FAIL,
    error: error
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(actions.signoutUser());
    }, expirationTime * 1000);
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
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      sessionStorage.setItem("token", response.data.idToken);
      sessionStorage.setItem("expirationDate", expirationDate);
      dispatch(signupUserSuccess());
      dispatch(checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
      let errorMessage = null;
      switch (error.response.data.error.message) {
        case "INVALID_EMAIL":
          errorMessage = "The email address is badly formatted.";
          break;
        case "EMAIL_EXISTS":
          errorMessage =
            "The email address is already in use by another account.";
          break;
        case "OPERATION_NOT_ALLOWED":
          errorMessage = "Password sign-in is disabled for this project.";
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          errorMessage =
            "We have blocked all requests from this device due to unusual activity. Try again later.";
          break;
        default:
          errorMessage = error.response.data.error.message;
      }
      dispatch(signupUserFail(errorMessage));
    }
  };
};
