import * as actionTypes from "../actions/actionTypes";

const initialState = {
  authenticated: false,
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN_USER_START:
      return { ...state, loading: true };
    case actionTypes.SIGNIN_USER_SUCCESS:
      return { ...state, loading: false, authenticated: true, error: null };
    case actionTypes.SIGNIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        authenticated: false,
        error: action.error
      };
    case actionTypes.SIGNOUT_USER_START:
      return { ...state, loading: true };
    case actionTypes.SIGNOUT_USER_SUCCESS:
      return { ...state, loading: false, authenticated: false, error: null };
    case actionTypes.SIGNOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        authenticated: false,
        error: action.error
      };
    case actionTypes.SIGNUP_USER_START:
      return { ...state, loading: true };
    case actionTypes.SIGNUP_USER_SUCCESS:
      return { ...state, loading: false, authenticated: true, error: null };
    case actionTypes.SIGNUP_USER_FAIL:
      return {
        ...state,
        loading: false,
        authenticated: false,
        error: action.error
      };
    case actionTypes.RESET_AUTH_STATE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
