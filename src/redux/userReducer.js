import axios from "axios";
const initialState = {
  user: "",
  username: "",
  password: "",
  logoutMessage: null
};

//Action Types
const SET_USER = "SET_USER",
  SET_BUDGET_AMOUNT = "SET_BUDGET_AMOUNT",
  DESTROY_USER = "DESTROY_USER",
  CREATE_USER = "CREATE_USER",
  LOG_IN_USER = "LOG_IN_USER",
  HANDLE_LOGIN_FORM = "HANDLE_LOGIN_FORM",
  MESSAGE = "MESSAGE";
//Reducer Function
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${SET_USER}_FULFILLED`:
      return { ...state, user: action.payload };
    case `${CREATE_USER}_FULFILLED`:
      return { ...state, user: action.payload };
    case `${DESTROY_USER}_FULFILLED`:
      return { ...state, logoutMessage: action.payload, user: null };
    case `${LOG_IN_USER}_FULFILLED`:
      return { ...state, user: action.payload };
    case MESSAGE:
      return { ...state, logoutMessage: null };
    case `${HANDLE_LOGIN_FORM}`:
      return {
        ...state,
        [action.payload.target.name]: action.payload.target.value
      };
    case `${SET_BUDGET_AMOUNT}_FULFILLED`:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

//Action Creators
export function setUser(history) {
  return {
    type: SET_USER,
    payload: axios
      .get(`/api/user-data`)
      .then(res => {
        history.push(`/${res.data.id}`);
        return res.data;
      })
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

export function logout(history) {
  return {
    type: DESTROY_USER,
    payload: axios
      .post("/api/user-data")
      .then(res => {
        history.push("/");
        return res.data;
      })
      .catch(err => console.log("err in destroy user", err))
  };
}

export function createUser(username, email, password, history) {
  return {
    type: CREATE_USER,
    payload: axios
      .post("/auth/register", { username, email, password })
      .then(res => {
        history.push(`/${res.data.id}`);
        return res.data;
      })
      .catch(err => console.log("Err in createUser", err))
  };
}
export function logIn(username, password, history) {
  return {
    type: LOG_IN_USER,
    payload: axios
      .post("/auth/login", { username, password })
      .then(res => {
        history.push(`/${res.data.id}`);
        return res.data;
      })
      .catch(err => console.log("Err in createUser", err))
  };
}
export function handleLoginForm(e) {
  return {
    type: HANDLE_LOGIN_FORM,
    payload: e
  };
}
export function handleMessage() {
  return {
    type: MESSAGE
  };
}
