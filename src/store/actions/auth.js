import axios from "axios";

import * as actionTypes from "./actionTypes";
import * as actions from "./index";

const SIGNIN_URL =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCKFAB17VvlMONffRcW4puBYkQpOmf8rTw";

const SIGNUP_URL =
  "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCKFAB17VvlMONffRcW4puBYkQpOmf8rTw";

export const signinUserStart = () => {
  return {
    type: actionTypes.SIGNIN_USER_START
  };
};

export const signinUserSuccess = () => {
  return {
    type: actionTypes.SIGNIN_USER_SUCCESS
  };
};

export const signinUserFail = error => {
  return {
    type: actionTypes.SIGNIN_USER_FAIL,
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

export const signinUser = (email, password) => {
  return async dispatch => {
    dispatch(signinUserStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    try {
      const response = await axios.post(SIGNIN_URL, authData);
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      sessionStorage.setItem("token", response.data.idToken);
      sessionStorage.setItem("expirationDate", expirationDate);
      dispatch(signinUserSuccess());
      dispatch(checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
      let errorMessage = null;
      switch (error.response.data.error.message) {
        case "INVALID_EMAIL":
          errorMessage = "The email address is badly formatted.";
          break;
        case "EMAIL_NOT_FOUND":
          errorMessage =
            "There is no user record corresponding to this identifier. The user may have been deleted.";
          break;
        case "INVALID_PASSWORD":
          errorMessage =
            "The password is invalid or the user does not have a password.";
          break;
        case "USER_DISABLED":
          errorMessage =
            "The user account has been disabled by an administrator.";
          break;
        default:
          errorMessage = error.response.data.error.message;
      }
      dispatch(signinUserFail(errorMessage));
    }
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      dispatch(actions.signoutUser());
    } else {
      const expirationDate = new Date(sessionStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(actions.signoutUser());
      } else {
        dispatch(signinUserSuccess());
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const signupUserStart = () => {
  return {
    type: actionTypes.SIGNUP_USER_START
  };
};

export const resetAuthState = () => {
  return {
    type: actionTypes.RESET_AUTH_STATE
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

export const signupUser = (email, password) => {
  return async dispatch => {
    dispatch(signupUserStart());
    const authData = {
      email,
      password
    };
    try {
      const response = await axios.post(SIGNUP_URL, authData);
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
      sessionStorage.removeItem("expirationDate");
      dispatch(signoutUserSuccess());
    } catch (error) {
      dispatch(signoutUserFail(error));
    }
  };
};
