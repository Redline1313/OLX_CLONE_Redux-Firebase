import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "../actionTypes/homeActionTypes";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_PRODUCTS_REQUEST });

      const productsRef = collection(db, "items");
      const productsSnapshot = await getDocs(productsRef);

      const productsData = [];
      productsSnapshot.forEach((doc) => {
        const productData = doc.data();
        productData.itemId = doc.id;
        productsData.push(productData);
      });

      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: productsData });
    } catch (error) {
      dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
  };
};
