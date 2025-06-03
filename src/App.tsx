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
import { get } from "http";

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
  const [isLoading, setLoading] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  const [filter, setFilter] = useState(filterOptions[0].value);

  const context = useTheme();
  const { darkMode, toggleTheme } = context;

  useEffect(() => {
    loadItems(0, filter);
  }, [filter]);

  const loadItems = async (page = 0, filter = "all") => {
    try {
      setLoading(true);
      const res = await fetchItems({ page, filter });
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleClearCompleted = async () => {
    try {
      setLoading(true);
      await clearCompleted();
      setItems((prevItems) => prevItems.filter((item) => !item.completed));
    } catch (error) {
      console.error("Error clearing completed items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (name: string) => {
    if (!name.trim()) return;
    const newItem: ItemDto = { title: name, completed: false };
    try {
      await addItem(newItem);
      loadItems(0, filter);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleCompleteItem = async (id: number) => {
    try {
      setLoading(true);
      await completeItem(id);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      );
    } catch (error) {
      console.error("Error completing item:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMoreData = async (page: number) => {
    const res = await fetchItems({ page, filter });
    return res.data;
  }

  const handleLoadMore = (newData: Item[]) => {
    console.log("hehe");
    console.log("Loading more items:", newData);
    setItems((prevItems) => [...prevItems, ...newData]);
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
      <Header handleAddItem={handleAddItem} />
      <Main
        items={items}
        filter={filter}
        handleCompleteItem={handleCompleteItem}
        handleLoadMore={handleLoadMore}
        getMoreData={getMoreData}
      />
      <Footer
        itemsLeft={items.filter((item) => !item.completed).length}
        filter={filter}
        handleClearCompleted={handleClearCompleted}
        handleFilterChange={handleFilterChange}
      />
      <footer>
        <p>Double-click to edit a todo</p>
        <p>Created by the TodoMVC Team</p>
        <p>Part of TodoMVC</p>
      </footer>
    </div>
  );
}

export default App;

