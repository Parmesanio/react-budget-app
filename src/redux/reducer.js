import axios from "axios";
const initialState = {
  budgetItems: null,
  budget: 0,
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
  selectedColor: null,
  editing: 0
};

//Action Types
const SET_BUDGET_ITEMS = "SET_BUDGET_ITEMS",
  CREATE_BUDGET_ITEM = "CREATE_BUDGET_ITEM",
  DELETE_BUDGET_ITEM = "DELETE_BUDGET_ITEM",
  EDIT_BUDGET_ITEM = "EDIT_BUDGET_ITEM",
  SET_BUDGET_OBJECT = "SET_BUDGET_OBJECT",
  EDIT_MODE = "EDIT_MODE";

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
    case `${DELETE_BUDGET_ITEM}_FULFILLED`:
      return { ...state, budgetItems: action.payload };
    case EDIT_MODE:
      let budgetItem = state.budgetItems.find(
        item => item.id == action.payload
      );
      return {
        ...state,
        editing: action.payload,
        title: budgetItem.title,
        amount: budgetItem.amount,
        selectedColor: budgetItem.color
      };
    case `${EDIT_BUDGET_ITEM}_FULFILLED`:
      return {
        ...state,
        budgetItems: action.payload,
        editing: 0,
        title: null,
        amount: null,
        selectedColor: null
      };
    default:
      return state;
  }
}

//Action Creators
export function setBudgetItems(id, history) {
  return {
    type: SET_BUDGET_ITEMS,
    payload: axios
      .get(`/api/budget-items/${id}`)
      .then(res => {
        // history.push(`/${id}`);
        return res.data;
      })
      .catch(err => console.log(err))
  };
}
export function handleChange(e) {
  return {
    type: SET_BUDGET_OBJECT,
    payload: e
  };
}
export function handleCreate(title, amount, color, history, id) {
  console.log(title, +amount, color, history);
  return {
    type: CREATE_BUDGET_ITEM,
    payload: axios
      .post("/api/budget-items", { title, amount, color })
      .then(res => {
        // history.push(`/${id}`);
        return res.data;
      })
      .catch(err => console.log(err))
  };
}
export function handleDelete(id, userId) {
  return {
    type: DELETE_BUDGET_ITEM,
    payload: axios
      .delete(`/api/budget-items/${id}?userId=${userId}`)
      .then(res => {
        // history.push(`/${userId}`);
        return res.data;
      })
      .catch(err => console.log(err))
  };
}
export function editItem(itemId, userId, title, color, amount) {
  return {
    type: EDIT_BUDGET_ITEM,
    payload: axios
      .put(`/api/budget-items/${itemId}`, { userId, title, amount, color })
      .then(res => res.data)
      .catch(err => console.log(err))
  };
}
export function editMode(history, itemId) {
  history.push("/budget/create");
  return {
    type: EDIT_MODE,
    payload: itemId
  };
}
