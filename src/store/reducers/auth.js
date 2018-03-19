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
      return { ...state, loading: false, authenticated: true };
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
      return { ...state, loading: false, authenticated: false };
    case actionTypes.SIGNOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        authenticated: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;
