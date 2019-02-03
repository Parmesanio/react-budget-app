import axios from "axios";
const initialState = {
  budgetItems: null,
  budget: 0,
  title: null,
  amount: null,
  spent: 0,
  colors: [
    // First Row
    "hsla(360, 71%, 70%, 1)",
    "hsla(25, 71%, 70%, 1)",
    "hsla(60, 71%, 70%, 1)",
    "hsla(125, 71%, 70%, 1)",
    "hsla(255, 71%, 70%, 1)",
    "hsla(240, 71%, 70%, 1)",
    // Second Row
    "hsla(360, 71%, 60%, 1)",
    "hsla(25, 71%, 50%, 1)",
    "hsla(60, 71%, 50%, 1)",
    "hsla(125, 71%, 50%, 1)",
    "hsla(255, 71%, 50%, 1)",
    "hsla(240, 71%, 50%, 1)",
    // Third Row
    "hsla(360, 71%, 30%, 1)",
    "hsla(25, 71%, 30%, 1)",
    "hsla(60, 71%, 30%, 1)",
    "hsla(125, 71%, 30%, 1)",
    "hsla(255, 71%, 30%, 1)",
    "hsla(240, 71%, 30%, 1)",
    // First Row
    "hsla(304, 71%, 70%, 1)",
    "hsla(0, 0%, 70%, 1)",
    "hsla(45, 71%, 70%, 1)",
    "hsla(163, 71%, 70%, 1)",
    "hsla(270, 71%, 70%, 1)",
    "hsla(202, 71%, 70%, 1)",
    // Second Row
    "hsla(304, 71%, 50%, 1)",
    "hsla(0, 0%, 50%, 1)",
    "hsla(45, 71%, 50%, 1)",
    "hsla(163, 71%, 50%, 1)",
    "hsla(270, 71%, 50%, 1)",
    "hsla(202, 71%, 50%, 1)",
    // Third Row
    "hsla(304, 71%, 30%, 1)",
    "hsla(0, 0%, 30%, 1)",
    "hsla(45, 71%, 30%, 1)",
    "hsla(163, 71%, 30%, 1)",
    "hsla(270, 71%, 30%, 1)",
    "hsla(202, 71%, 30%, 1)"
  ],
  selectedColor: null,
  editing: 0,
  toggleColors: false,
  online: true,
  dates: null
};

//Action Types
const SET_BUDGET_ITEMS = "SET_BUDGET_ITEMS",
  CREATE_BUDGET_ITEM = "CREATE_BUDGET_ITEM",
  DELETE_BUDGET_ITEM = "DELETE_BUDGET_ITEM",
  EDIT_BUDGET_ITEM = "EDIT_BUDGET_ITEM",
  SET_BUDGET_OBJECT = "SET_BUDGET_OBJECT",
  EDIT_MODE = "EDIT_MODE",
  CANCEL_EDIT_MODE = "CANCEL_EDIT_MODE",
  ONLINE_STATUS = "ONLINE_STATUS";

//Reducer Function
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${SET_BUDGET_ITEMS}_FULFILLED`:
      return {
        ...state,
        budgetItems: action.payload.items,
        dates: action.payload.dates
      };
    case `${SET_BUDGET_OBJECT}`:
      return {
        ...state,
        [action.payload.target.name]: action.payload.target.value,
        toggleColors: true
      };
    case `${CREATE_BUDGET_ITEM}_FULFILLED`:
      return {
        ...state,
        budgetItems: action.payload,
        title: null,
        amount: null,
        spent: null,
        selectedColor: null,
        toggleColors: false
      };
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
        spent: budgetItem.spent,
        selectedColor: budgetItem.color
      };
    case CANCEL_EDIT_MODE:
      return {
        ...state,
        editing: null,
        title: null,
        amount: null,
        spent: null,
        selectedColor: null,
        toggleColors: false
      };

    case `${EDIT_BUDGET_ITEM}_FULFILLED`:
      return {
        ...state,
        budgetItems: action.payload,
        editing: 0,
        title: null,
        amount: null,
        spent: null,
        selectedColor: null,
        toggleColors: false
      };
    case ONLINE_STATUS:
      return { ...state, online: !state.online };
    default:
      return { ...state };
  }
}

//Action Creators
export function setBudgetItems(id, month = null, year = null) {
  console.log("setBudgetItems fired", id, month, year);

  return {
    type: SET_BUDGET_ITEMS,
    payload: axios
      .get(`/api/budget-items/${id}?month=${month}&year=${year}`)
      .then(res => {
        console.log(res.data);

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
export function handleCreate(title, amount, spent, color, history, id) {
  console.log(title, +amount, +spent, color, history);
  return {
    type: CREATE_BUDGET_ITEM,
    payload: axios
      .post("/api/budget-items", { title, amount, spent, color })
      .then(res => {
        history.push(`/${id}`);
        return res.data;
      })
      .catch(err => console.log(err))
  };
}
export function handleDelete(id, userId, history) {
  return {
    type: DELETE_BUDGET_ITEM,
    payload: axios
      .delete(`/api/budget-items/${id}?userId=${userId}`)
      .then(res => {
        history.push(`/${userId}`);
        return res.data;
      })
      .catch(err => console.log(err))
  };
}
export function editItem(itemId, userId, title, color, amount, spent, history) {
  return {
    type: EDIT_BUDGET_ITEM,
    payload: axios
      .put(`/api/budget-items/${itemId}`, { userId, title, amount, color, spent })
      .then(res => {
        history.push(`/${userId}`);
        return res.data;
      })
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
export function cancelEditMode(history, id) {
  history.push(`/${id}`);
  return {
    type: CANCEL_EDIT_MODE
  };
}
export function onlineMode() {
  return {
    type: ONLINE_STATUS
  };
}
