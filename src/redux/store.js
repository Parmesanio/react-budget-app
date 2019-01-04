import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxPromiseMiddleware from "redux-promise-middleware";
import budgetReducer from "./reducer";
import userReducer from "./userReducer";

const reducer = combineReducers({
  budget: budgetReducer,
  user: userReducer
});
const store = createStore(reducer, applyMiddleware(reduxPromiseMiddleware()));

export default store;
