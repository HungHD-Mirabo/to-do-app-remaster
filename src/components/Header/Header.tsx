import React, { useState } from "react";
import { useTheme } from "../../themeContext";

interface HeaderProps {
  handleAddItem: (name: string) => void;
}

export function Header(props: HeaderProps) {
  const { handleAddItem } = props;
  const [name, setName] = useState("");

  const context = useTheme();

  const { darkMode, toggleTheme } = context;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddItem(name);
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
