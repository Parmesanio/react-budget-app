import axios from "axios";
const initialState = {
  user: null
};

//Action Types
const SET_USER = "SET_USER";
//Reducer Function
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${SET_USER}_FULFILLED`:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

//Action Creators
export function setUser() {
  return {
    type: SET_USER,
    payload: axios
      .get(`/api/user-data`)
      .then(res => res.data[0])
      .catch(err => console.log(err))
  };
}
