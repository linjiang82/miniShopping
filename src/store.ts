import { createStore } from "redux";
import testReducer from "./reducers/reducer";

const store = createStore(testReducer);
export default store;
