import {
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
} from "../actionTypes/addItemActionTypes";

const addItemReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ITEM_REQUEST:
      return {
        isLoading: true,
        error: null,
      };
    case ADD_ITEM_SUCCESS:
      return {
        isLoading: false,
      };
    case ADD_ITEM_FAILURE:
      return {
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default addItemReducer;
