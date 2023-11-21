import Pagination from "@mui/material/Pagination";
import { recoilMaxPage, recoilPage } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useState } from "react";
import { PaginationItem } from "@mui/material";

export default function BasicPagination() {
  const [page, setRecPage] = useRecoilState<number>(recoilPage);
  const [maxPage] = useRecoilState<number>(recoilMaxPage);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [focusedItem, setFocusedItem] = useState<number | null>(null);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getSize() {
    switch (true) {
      case width < 465 && width > 370:
        return "medium";
      case width < 370:
        return "small";
      default:
        return "large";
    }
  }

  return (
    <div className="pagination">
      <Pagination
        page={page}
        onChange={(_e: React.ChangeEvent<unknown>, value: number) =>
          setRecPage(value)
        }
        count={maxPage}
        variant="outlined"
        size={getSize()}
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            style={
              item.page === focusedItem ? { backgroundColor: "lightgray" } : {}
            }
            onFocus={() => {
              setFocusedItem(item.page);
            }}
            onBlur={() => setFocusedItem(null)}
          />
        )}
        data-testid="pagination"
      />
      <p>{}</p>
    </div>
  );
}
