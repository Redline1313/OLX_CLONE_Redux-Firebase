import {
  FETCH_ITEM_DETAILS_REQUEST,
  FETCH_ITEM_DETAILS_SUCCESS,
  FETCH_ITEM_DETAILS_FAILURE,
} from "../actionTypes/itemDetailsTypes";

const itemDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ITEM_DETAILS_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case FETCH_ITEM_DETAILS_SUCCESS:
      return {
        loading: false,
        itemDetails: action.payload,
        error: null,
      };
    case FETCH_ITEM_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default itemDetailsReducer;
