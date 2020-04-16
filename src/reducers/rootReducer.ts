import { combineReducers } from "redux";
import courseReducer from "./courseReducer";
import detailReducer from "./detailReducer";
import loginReducer from "./loginReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
  courses: courseReducer,
  detail: detailReducer,
  login: loginReducer,
  search: searchReducer,
});

export default rootReducer;
