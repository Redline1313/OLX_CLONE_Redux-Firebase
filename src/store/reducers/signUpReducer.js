import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
} from "../actionTypes/authActionTypes";

const signUpReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { loading: true };
    case SIGNUP_SUCCESS:
      return {
        loading: false,
        success: true,
        username: action.payload,
      };
    case SIGNUP_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default signUpReducer;
