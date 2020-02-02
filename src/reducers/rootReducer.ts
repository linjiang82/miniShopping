import { combineReducers } from "redux";
import courseReducer from "./courseReducer";
import detailReducer from "./detailReducer";

const rootReducer = combineReducers({
  courses: courseReducer,
  detail: detailReducer
});

export default rootReducer;
