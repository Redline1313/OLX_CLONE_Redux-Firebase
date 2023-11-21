import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "../actionTypes/userType";
const initialState = {
  isLoading: false,
  products: [],
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { isLoading: true };

    case FETCH_USERS_SUCCESS:
      return { isLoading: false, users: action.payload, error: null };

    case FETCH_USERS_FAILURE:
      return { error: action.payload };

    default:
      return state;
  }
};

export default userReducer;
