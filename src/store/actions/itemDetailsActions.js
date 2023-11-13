import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  FETCH_ITEM_DETAILS_REQUEST,
  FETCH_ITEM_DETAILS_SUCCESS,
  FETCH_ITEM_DETAILS_FAILURE,
} from "../actionTypes/itemDetailsTypes";

export const fetchItemDetails = (itemId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ITEM_DETAILS_REQUEST });

    try {
      const itemDocRef = doc(db, "items", itemId);
      const itemDoc = await getDoc(itemDocRef);

      if (itemDoc.exists()) {
        dispatch({
          type: FETCH_ITEM_DETAILS_SUCCESS,
          payload: itemDoc.data(),
        });
      } else {
        dispatch({ type: FETCH_ITEM_DETAILS_FAILURE, error: "Item not found" });
      }
    } catch (error) {
      dispatch({ type: FETCH_ITEM_DETAILS_FAILURE, error: error.message });
    }
  };
};
