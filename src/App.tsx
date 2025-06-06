import React, { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { Footer } from "./components/Footer/Footer";
import { useTheme } from "./themeContext";
import { DataUtilities } from "./DataFake";
import {
  addItem,
  clearCompleted,
  completeItem,
  fetchItems,
  updateItem,
} from "./apis/to-do.api";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { addTodo, fetchTodos } from "./actions/todoAction";

export interface Item {
  id: number;
  title: string;
  completed: boolean;
}

export interface ItemDto {
  title: string;
  completed: boolean;
}

export const filterOptions = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

const data = new DataUtilities();

function App() {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const { items, filter, isLoading } = useSelector((state: any) => state.todos);

  const context = useTheme();
  const { darkMode, toggleTheme } = context;

  useEffect(() => {
    dispatch(fetchTodos(0, filter));
  }, [filter]);

  const handleFilterChange = (newFilter: string) => {
    dispatch({ type: "SET_FILTER", payload: newFilter });
  };

  const getMoreData = async (page: number) => {
    const res = await fetchItems({ page, filter });
    return res.data;
  };

  console.log("theme", context.theme);

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      {isLoading && <div className="loading">Loading...</div>}
      <header className="header">
        <h1>Todo List</h1>
        <button className="header__theme-toggle" onClick={toggleTheme}>
          {darkMode ? "Light" : "Dark"}
        </button>
      </header>
      <Header />
      <Main getMoreData={getMoreData} />
      <Footer />
      <footer>
        <p>Double-click to edit a todo</p>
        <p>Created by the TodoMVC Team</p>
        <p>Part of TodoMVC</p>
      </footer>
    </div>
  );
}

export default App;
