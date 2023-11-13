import { collection, getDocs } from "firebase/firestore";
import {
  FETCH_VIEW_PRODUCTS_REQUEST,
  FETCH_VIEW_PRODUCTS_SUCCESS,
  FETCH_VIEW_PRODUCTS_FAILURE,
  SET_SORT_BY,
  SET_PRICE_RANGE,
  TOGGLE_DISPLAY_CARD2,
  SET_SORTED_PRODUCTS,
} from "../actionTypes/viewMoreTypes";
import { db } from "../../config/firebase";

export const ViewFetchProducts = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_VIEW_PRODUCTS_REQUEST });

    try {
      const productsRef = collection(db, "items");
      const productsSnapshot = await getDocs(productsRef);
      const productsData = [];
      productsSnapshot.forEach((doc) => {
        const productData = doc.data();
        productData.itemId = doc.id;
        productsData.push(productData);
      });

      dispatch({
        type: FETCH_VIEW_PRODUCTS_SUCCESS,
        payload: productsData,
      });
    } catch (error) {
      dispatch({ type: FETCH_VIEW_PRODUCTS_FAILURE, payload: error.message });
    }
  };
};

export const setPriceRange = (minPrice, maxPrice) => ({
  type: SET_PRICE_RANGE,
  payload: { minPrice, maxPrice },
});
export const setSortBy = (sortedProducts) => ({
  type: SET_SORT_BY,
  payload: sortedProducts,
});
export const setSortedProducts = (sortedProducts) => ({
  type: SET_SORTED_PRODUCTS,
  payload: sortedProducts,
});

export const toggleDisplayCard2 = () => ({
  type: TOGGLE_DISPLAY_CARD2,
});
