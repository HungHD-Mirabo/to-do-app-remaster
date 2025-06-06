import { get } from "http";
import { Item } from "../../App";
import { DataUtilities } from "../../DataFake";
import { useTheme } from "../../themeContext";
import Result from "../Result/Result";

interface MainProps {
  getMoreData: (page: number) => any;
}

export function Main(mainProps: MainProps) {
  const context = useTheme();

  const { darkMode } = context;

  const { getMoreData } = mainProps;

  return (
    <div className={`main-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <main>
        <Result getData={getMoreData} />
      </main>
    </div>
  );
}
