import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from "../actionTypes/homeActionTypes";

const homeReducer = (state = {}, action) => {
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
    default:
      return state;
  }
};

export default homeReducer;
