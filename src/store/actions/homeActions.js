import { collection, getDocs, deleteDoc, doc } from "@firebase/firestore";
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

export const deleteProduct = (itemId) => {
  return async (dispatch) => {
    try {
      // Delete the product by ID
      const productRef = doc(db, "items", itemId);
      await deleteDoc(productRef);

      // Fetch products again after deletion
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
};

export const deleteAllProducts = () => {
  return async (dispatch) => {
    try {
      // Delete all products
      const productsRef = collection(db, "items");
      const productsSnapshot = await getDocs(productsRef);

      const deletePromises = productsSnapshot.docs.map(async (doc) => {
        await deleteDoc(doc.ref);
      });

      await Promise.all(deletePromises);

      // Fetch products again after deletion
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Error deleting all products:", error);
    }
  };
};
