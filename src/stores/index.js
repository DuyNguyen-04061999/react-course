import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./authReducer";

// const thunk =
//   ({ dispatch }) =>
//   (next) =>
//   (action) => {
//     if (typeof action === "function") {
//       return action(dispatch);
//     }
//     next(action);
//   };

const reducer = combineReducers({
  auth: authReducer,
});

const store = configureStore({
  reducer,
  devTools: import.meta.env.VITE_ENV === "development",
});
export default store;
