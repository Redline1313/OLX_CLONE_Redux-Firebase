import { getAuth } from "@firebase/auth";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "../actionTypes/userType";

export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_USERS_REQUEST });

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };

      dispatch({ type: FETCH_USERS_SUCCESS, payload: [userData] });
    } else {
      dispatch({ type: FETCH_USERS_SUCCESS, payload: [] });
    }
  } catch (error) {
    dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
  }
};
