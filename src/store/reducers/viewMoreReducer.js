import {
  FETCH_VIEW_PRODUCTS_REQUEST,
  FETCH_VIEW_PRODUCTS_SUCCESS,
  FETCH_VIEW_PRODUCTS_FAILURE,
  SET_SORT_BY,
  SET_PRICE_RANGE,
  TOGGLE_DISPLAY_CARD2,
  SET_SORTED_PRODUCTS,
} from "../actionTypes/viewMoreTypes";

const initialState = {
  products: [],
  sortBy: "Newly listed",
  minPrice: 0,
  maxPrice: 1000000,
  displayCard2: true,
  loading: true,
  error: null,
};

const viewMoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIEW_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_VIEW_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };
    case FETCH_VIEW_PRODUCTS_FAILURE:
      return {
        loading: false,
        error: action.error,
      };
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };
    case SET_SORTED_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case SET_PRICE_RANGE:
      return {
        ...state,
        minPrice: action.payload.minPrice,
        maxPrice: action.payload.maxPrice,
      };
    case TOGGLE_DISPLAY_CARD2:
      return {
        ...state,
        displayCard2: !state.displayCard2,
      };
    default:
      return state;
  }
};

export default viewMoreReducer;
