import axios from "axios";
const initialState = {
  budgetItems: null,
  title: null,
  amount: null,
  colors: [
    "hsla(360, 71%, 50%, 1)",
    "hsla(304, 71%, 50%, 1)",
    "hsla(280, 71%, 50%, 1)",
    "hsla(240, 71%, 50%, 1)",
    "hsla(180, 71%, 50%, 1)",
    "hsla(125, 71%, 50%, 1)",
    "hsla(60, 71%, 50%, 1)",
    "hsla(25, 71%, 50%, 1)"
  ],
  selectedColor: null
};

//Action Types
const SET_BUDGET_ITEMS = "SET_BUDGET_ITEMS",
  CREATE_BUDGET_ITEM = "CREATE_BUDGET_ITEM",
  SET_BUDGET_OBJECT = "SET_BUDGET_OBJECT";

//Reducer Function
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${SET_BUDGET_ITEMS}_FULFILLED`:
      return { ...state, budgetItems: action.payload };
    case `${SET_BUDGET_OBJECT}`:
      return {
        ...state,
        [action.payload.target.name]: action.payload.target.value
      };
    case `${CREATE_BUDGET_ITEM}_FULFILLED`:
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
export function handleChange(e) {
  return {
    type: SET_BUDGET_OBJECT,
    payload: e
  };
}
export function handleCreate(title, amount, color) {
  console.log(title, +amount, color);
  return {
    type: CREATE_BUDGET_ITEM,
    payload: axios
      .post("/api/budget-items", { title, amount, color })
      .then(res => res.data)
      .catch(err => console.log(err))
  };
}
