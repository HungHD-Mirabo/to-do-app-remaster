import { applyMiddleware, combineReducers, createStore } from "redux";
import { todoReducer } from "../reducers/todoReducers";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  todos: todoReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
