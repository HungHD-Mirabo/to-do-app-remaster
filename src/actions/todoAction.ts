import { completeItem, fetchItems } from "../apis/to-do.api";

export const fetchTodos = (page: number, filter: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const res = await fetchItems({ page, filter });
      dispatch({ type: "FETCH_TODOS", payload: res.data });
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
};

export const addTodo = (name: string, completed: boolean = false) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const newItem = { title: name, completed };
      const res = await fetchItems(newItem);
      dispatch({ type: "ADD_TODO", payload: res.data });
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }
};

export const toggleTodo = (id: number) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      await completeItem(id);
      dispatch({ type: "TOGGLE_TODO", payload: id });
    } catch (error) {
      console.error("Error toggling todo:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }
};

export const clearCompleted = () => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      await fetchItems({ action: "clear" });
      dispatch({ type: "CLEAR_COMPLETED" });
    } catch (error) {
      console.error("Error clearing completed todos:", error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }
};

export const loadMoreTodos = (newData: any[]) => {
  return {
    type: "LOAD_MORE_TODOS",
    payload: newData,
  };
};

export const setFilter = (filter: string) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};
