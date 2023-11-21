import { addDoc, collection } from "@firebase/firestore";
import { db } from "../../config/firebase";
import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
} from "../actionTypes/addItemActionTypes";

export const addItem = (itemData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_ITEM_REQUEST });
      await addDoc(collection(db, "items"), itemData);

      dispatch({ type: ADD_ITEM_SUCCESS });
    } catch (error) {
      dispatch({ type: ADD_ITEM_FAILURE, payload: error.message });
    }
  };
};
