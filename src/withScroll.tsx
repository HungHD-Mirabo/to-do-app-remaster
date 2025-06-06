import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  ComponentType,
} from "react";
import { Item } from "./App";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { loadMoreTodos } from "./actions/todoAction";

export interface WithScrollProps {
  getData: (page: number) => Item[];
}

const withScrollLoadMore = <P extends WithScrollProps>(
  WrappedComponent: ComponentType<P>
) => {
  return (props: P) => {
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

    const { items } = useSelector((state: any) => state.todos);

    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const { getData } = props;

    const loadMore = useCallback(() => {
      console.log("loadMore called");
      if (loading || !hasMore) return;

      console.log("Current page:", page);

      setPage((prevPage) => prevPage + 1);
      setLoading(true);
      try {
        console.log("Fetching data for page:", page + 1);
        console.log("getData function:", getData);
        const newData = getData(page);
        console.log("Data fetched:", newData);

        if (!newData || newData.length === 0) {
          setLoading(false);
          setHasMore(false);
          console.log("No more data to load");
          return;
        }

        console.log("New data loaded:", newData);
        console.log("handleLoadMore ", dispatch(loadMoreTodos(newData)));

        dispatch(loadMoreTodos(newData));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setHasMore(false);
      }
    }, [hasMore, loading, getData]);

    const handleScroll = useCallback(() => {
      console.log("handleScroll called");
      const container = containerRef.current;
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;

      if (
        scrollTop + clientHeight >= scrollHeight - 50 &&
        !loading &&
        hasMore
      ) {
        console.log("Loading more items...");
        loadMore();
      }
    }, [loadMore, loading, hasMore]);

    useEffect(() => {
      const container = containerRef.current;
      if (container) {
        const onScroll = () => handleScroll();
        container.addEventListener("scroll", onScroll);
        return () => {
          container.removeEventListener("scroll", onScroll);
        };
      }
      return undefined;
    }, [handleScroll]);

    return (
      <div
        ref={containerRef}
        className="scroll-container"
        style={{
          height: "200px",
          overflowY: "auto",
          border: "1px solid #e5e7eb",
          borderRadius: "0.375rem",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          scrollBehavior: "smooth",
        }}
      >
        <WrappedComponent {...props} items={items} />

        {(loading || (!hasMore && items.length > 0)) && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "0.5rem 0",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            {loading ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    borderRadius: "9999px",
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor: "#3b82f6 transparent transparent transparent",
                    animation: "spin 1s linear infinite",
                    marginRight: "0.5rem",
                  }}
                ></div>
                <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                  Loading...
                </span>
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  color: "#6b7280",
                  fontSize: "0.875rem",
                }}
              >
                No more items to load
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
};

export default withScrollLoadMore;
