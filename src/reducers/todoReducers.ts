import { Item } from "../App";

const initialState = {
  todos: [] as Item[],
  filter: "all",
  loading: false,
};

export const todoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'FETCH_TODOS_SUCCESS':
      return {
        ...state,
        todos: action.payload,
      };
    case 'ADD_TODO_SUCCESS':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'TOGGLE_TODO_SUCCESS':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'CLEAR_COMPLETED_SUCCESS':
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };
    case "LOAD_MORE_TODOS":
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
