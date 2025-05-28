interface ItemProps {
  item: {
    title: string;
    completed: boolean;
  };
  index: number;
  toggleItem: (name: string) => void;
}

export function ItemResult(props: ItemProps) {
  const { item, index, toggleItem } = props;

  return (
    <li className="todo-item" key={index}>
      <input
        type="checkbox"
        checked={item.completed}
        onClick={() => toggleItem(item.title)}
      />
      <div className={item.completed ? "completed" : ""}>{item.title}</div>
    </li>
  );
}
