interface FooterProps {
  itemsLeft?: number;
  filter?: string;
  handleClearCompleted?: () => void;
  handleFilterChange: (filter: string) => void;
}

export function Footer(props: FooterProps) {
  const { itemsLeft, filter, handleClearCompleted, handleFilterChange } = props;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft}</strong> items left
      </span>
      <ul className="filters">
        <li>
          <span
            className={filter === "all" ? "selected" : ""}
            onClick={() => handleFilterChange("all")}
          >
            All
          </span>
        </li>
        <li>
          <span
            className={filter === "active" ? "selected" : ""}
            onClick={() => handleFilterChange("active")}
          >
            Active
          </span>
        </li>
        <li>
          <span
            className={filter === "completed" ? "selected" : ""}
            onClick={() => handleFilterChange("completed")}
          >
            Completed
          </span>
        </li>
      </ul>
      <button className="clear-completed" onClick={handleClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}
