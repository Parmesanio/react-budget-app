import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxPromiseMiddleware from "redux-promise-middleware";
import budgetReducer from "./reducer";

const reducer = combineReducers({
  budget: budgetReducer
});
const store = createStore(reducer, applyMiddleware(reduxPromiseMiddleware()));

export default store;
