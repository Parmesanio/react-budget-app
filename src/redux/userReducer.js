import axios from "axios";
const initialState = {
  user: null
};

//Action Types
const SET_USER = "SET_USER",
  SET_BUDGET_AMOUNT = "SET_BUDGET_AMOUNT";
//Reducer Function
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${SET_USER}_FULFILLED`:
      return { ...state, user: action.payload };
    case `${SET_BUDGET_AMOUNT}_FULFILLED`:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

//Action Creators
export function setUser() {
  console.log("SetUser Fired");

  return {
    type: SET_USER,
    payload: axios
      .get(`/api/user-data`)
      .then(res => res.data)
      .catch(err => console.log(err))
  };
}
export function setBudgetAmount(budget) {
  return {
    type: SET_BUDGET_AMOUNT,
    payload: axios
      .post("/api/budget-amount", { budget })
      .then(res => res.data)
      .catch(err => console.log(err))
  };
}
