interface ItemProps {
  item: {
    id: number;
    title: string;
    completed: boolean;
  };
  index: number;
  toggleItem: (id: number) => void;
}

export function ItemResult(props: ItemProps) {
  const { item, index, toggleItem } = props;

  return (
    <li className="todo-item" key={index}>
      <input
        type="checkbox"
        checked={item.completed}
        onClick={() => toggleItem(item.id)}
      />
      <div className={item.completed ? "completed" : ""}>{item.title}</div>
    </li>
  );
}
