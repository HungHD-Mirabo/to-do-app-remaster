import React, { useState } from "react";
import { useTheme } from "../../themeContext";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { addTodo } from "../../actions/todoAction";

export function Header() {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const [name, setName] = useState("");

  const context = useTheme();

  const { darkMode, toggleTheme } = context;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      dispatch(addTodo(name, false));
      setName("");
    }
  };

  return (
    <section className="todo-input">
      <div className="input-section">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="What needs to be done?"
          className="todo-input"
        />
      </div>
    </section>
  );
}
