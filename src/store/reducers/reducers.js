import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import signUpReducer from "./signUpReducer";
import googleLoginReducer from "./googleLoginReducer";
import addItemReducer from "./addItemReducer";
import homeReducer from "./homeReducer";
import itemDetailsReducer from "./itemDetailsReducer";
import viewMoreReducer from "./viewMoreReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  signup: signUpReducer,
  googleLogin: googleLoginReducer,
  addItem: addItemReducer,
  home: homeReducer,
  itemDetails: itemDetailsReducer,
  viewMore: viewMoreReducer,
  user: userReducer,
});

export default rootReducer;
