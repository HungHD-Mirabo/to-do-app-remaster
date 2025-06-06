import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { toggleTodo } from "../../actions/todoAction";

interface ItemProps {
  item: {
    id: number;
    title: string;
    completed: boolean;
  };
  index: number;
}

export function ItemResult(props: ItemProps) {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const { item, index } = props;

  return (
    <li className="todo-item" key={index}>
      <input
        type="checkbox"
        checked={item.completed}
        onClick={() => dispatch(toggleTodo(item.id))}
      />
      <div className={item.completed ? "completed" : ""}>{item.title}</div>
    </li>
  );
}
