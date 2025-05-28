import React, { useState } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { Footer } from "./components/Footer/Footer";
import { useTheme } from "./themeContext";
import { DataUtilities } from "./DataFake";

export interface Item {
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
  const [items, setItems] = useState<Item[]>(data.getItem(1));
  const [filter, setFilter] = useState(filterOptions[0].value);

  const context = useTheme();
  const { darkMode, toggleTheme } = context;

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleClearCompleted = () => {
    const updatedItems = items.filter((item) => !item.completed);
    setItems(updatedItems);
  };

  const handleAddItem = (name: string) => {
    setItems((prevItems) => [...prevItems, { title: name, completed: false }]);
  };

  const handleCompleteItem = (name: string) => {
    const updatedItems = items.map((item) =>
      item.title === name ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
  };

  const handleLoadMore = (newData: Item[]) => {
    console.log("hehe");
    console.log("Loading more items:", newData);
    setItems((prevItems) => [...prevItems, ...newData]);
  };

  console.log("theme", context.theme);

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
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
        data={data}
        handleLoadMore={handleLoadMore}
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
