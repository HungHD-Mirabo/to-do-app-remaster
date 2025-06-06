import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { clearCompleted, setFilter } from "../../actions/todoAction";

export function Footer() {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const { items, filter, isLoading } = useSelector((state: any) => state.todos);

  const itemsLeft = items.filter((item: any) => !item.completed).length;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft}</strong> items left
      </span>
      <ul className="filters">
        <li>
          <span
            className={filter === "all" ? "selected" : ""}
            onClick={() => dispatch(setFilter("all"))}
          >
            All
          </span>
        </li>
        <li>
          <span
            className={filter === "active" ? "selected" : ""}
            onClick={() => dispatch(setFilter("active"))}
          >
            Active
          </span>
        </li>
        <li>
          <span
            className={filter === "completed" ? "selected" : ""}
            onClick={() => dispatch(setFilter("completed"))}
          >
            Completed
          </span>
        </li>
      </ul>
      <button
        className="clear-completed"
        onClick={() => dispatch(clearCompleted())}
      >
        Clear completed
      </button>
    </footer>
  );
}
