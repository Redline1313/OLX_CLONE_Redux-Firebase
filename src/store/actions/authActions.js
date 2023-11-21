import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "@firebase/auth";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAILURE,
} from "../actionTypes/authActionTypes";
import { auth, provider } from "../../config/firebase";

export const signUpAction =
  (email, password, username, navigate) => async (dispatch) => {
    try {
      dispatch({ type: SIGNUP_REQUEST });

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: username,
      });

      navigate("/login");
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE, payload: error.message });
    }
  };

export const login = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const displayName = user;
    dispatch({ type: LOGIN_SUCCESS, payload: { username: displayName } });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};
export const googleSignIn = () => {
  return async (dispatch) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: user.displayName });
      return user;
    } catch (error) {
      dispatch({ type: GOOGLE_LOGIN_FAILURE, payload: error.message });
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };
};
