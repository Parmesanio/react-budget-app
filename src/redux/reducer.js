import axios from "axios";
const initialState = {
  user: null,
  budgetItems: null
};

//Action Types
const SET_BUDGET_ITEMS = "SET_BUDGET_ITEMS";
//Reducer Function
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${SET_BUDGET_ITEMS}_FULFILLED`:
      return { ...state, budgetItems: action.payload };
    default:
      return state;
  }
}

//Action Creators
export function setBudgetItems(id) {
  return {
    type: SET_BUDGET_ITEMS,
    payload: axios
      .get(`/api/budget-items/${id}`)
      .then(res => res.data)
      .catch(err => console.log(err))
  };
}
