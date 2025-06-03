import { Item } from "../../App";
import withScrollLoadMore from "../../withScroll";
import { ItemResult } from "../ItemResult/ItemResult";

import type { WithScrollProps } from "../../withScroll";

interface ResultProps extends WithScrollProps {
  filter: string;
  toggleItem: (id: number) => void;
  items: Item[];
  getData: (page: number) => any;
  handleLoadMore: (newData: Item[]) => void;
}
function Result(props: ResultProps) {
  const { filter, items, toggleItem } = props;

  const filteredItems = items.filter((item) =>
    filter === "all"
      ? true
      : filter === "active"
      ? !item.completed
      : item.completed
  );

  return (
    <div className="result-container">
      <div className="result-list">
        {filteredItems.map((item, index) => (
          <ItemResult
            key={index}
            item={item}
            index={index}
            toggleItem={toggleItem}
          />
        ))}
      </div>
    </div>
  );
}

export default withScrollLoadMore(Result);
