import {
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAILURE,
} from "../actionTypes/authActionTypes";

const googleLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case GOOGLE_LOGIN_SUCCESS:
      return { user: action.payload, error: null };
    case GOOGLE_LOGIN_FAILURE:
      return { error: action.payload };
    default:
      return state;
  }
};

export default googleLoginReducer;
