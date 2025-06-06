import { Item } from "../../App";
import withScrollLoadMore from "../../withScroll";
import { ItemResult } from "../ItemResult/ItemResult";

import type { WithScrollProps } from "../../withScroll";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { Key } from "react";

interface ResultProps extends WithScrollProps {
  getData: (page: number) => any;
}
function Result(props: ResultProps) {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  const { items, filter } = useSelector((state: any) => state.todos);

  const filteredItems = items.filter((item: Item) =>
    filter === "all"
      ? true
      : filter === "active"
      ? !item.completed
      : item.completed
  );

  return (
    <div className="result-container">
      <div className="result-list">
        {filteredItems.map((item: Item, index: Key | null | undefined) => (
          <ItemResult key={index} item={item} index={index as number} />
        ))}
      </div>
    </div>
  );
}

export default withScrollLoadMore(Result);
