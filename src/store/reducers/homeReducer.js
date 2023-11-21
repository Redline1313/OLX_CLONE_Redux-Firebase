import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "../actionTypes/homeActionTypes";

import {
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
} from "../actionTypes/updateProductTypes";

const initialState = {
  updateProductLoading: false,
  updateProductError: null,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        isLoading: true,
        error: null,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        isLoading: false,
        products: action.payload,
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        isLoading: false,
        error: action.payload,
      };
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        updateProductLoading: true,
        updateProductError: null,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        updateProductLoading: false,
      };

    case UPDATE_PRODUCT_FAILURE:
      return {
        ...state,
        updateProductLoading: false,
        updateProductError: action.payload,
      };

    default:
      return state;
  }
};

export default homeReducer;
