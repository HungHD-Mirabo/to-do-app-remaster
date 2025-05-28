import { Item } from "../../App";
import { DataUtilities } from "../../DataFake";
import { useTheme } from "../../themeContext";
import Result from "../Result/Result";

interface MainProps {
  items: {
    title: string;
    completed: boolean;
  }[];
  filter: string;
  handleCompleteItem: (name: string) => void;
  handleLoadMore: (newData: Item[]) => void;
  data: DataUtilities;
}

export function Main(mainProps: MainProps) {
  const context = useTheme();

  const { darkMode } = context;

  const { items, filter, handleCompleteItem, handleLoadMore, data } = mainProps;

  return (
    <div className={`main-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <main>
        <Result
          items={items}
          toggleItem={handleCompleteItem}
          filter={filter}
          getData={data.getItem}
          handleLoadMore={handleLoadMore}
        />
      </main>
    </div>
  );
}
