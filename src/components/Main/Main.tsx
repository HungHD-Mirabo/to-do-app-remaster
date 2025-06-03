import { get } from "http";
import { Item } from "../../App";
import { DataUtilities } from "../../DataFake";
import { useTheme } from "../../themeContext";
import Result from "../Result/Result";

interface MainProps {
  items: {
    id: number;
    title: string;
    completed: boolean;
  }[];
  filter: string;
  handleCompleteItem: (id: number) => void;
  handleLoadMore: (newData: Item[]) => void;
  getMoreData: (page: number) => any;
}

export function Main(mainProps: MainProps) {
  const context = useTheme();

  const { darkMode } = context;

  const { items, filter, handleCompleteItem, handleLoadMore, getMoreData } = mainProps;

  return (
    <div className={`main-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <main>
        <Result
          items={items}
          toggleItem={handleCompleteItem}
          filter={filter}
          getData={getMoreData}
          handleLoadMore={handleLoadMore}
        />
      </main>
    </div>
  );
}
