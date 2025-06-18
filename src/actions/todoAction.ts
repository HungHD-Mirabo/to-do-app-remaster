export const fetchTodos = (page: number, filter: string) => ({
    type: 'FETCH_TODOS_REQUEST',
    payload: { page, filter },
});

export const addTodo = (name: string, completed: boolean = false) => ({
    type: 'ADD_TODO_REQUEST',
    payload: { name, completed },
});

export const toggleTodo = (id: number) => ({
    type: 'TOGGLE_TODO_REQUEST',
    payload: { id },
});

export const clearCompleted = () => ({
    type: 'CLEAR_COMPLETED_REQUEST',
});

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
