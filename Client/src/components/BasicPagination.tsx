import Pagination from "@mui/material/Pagination";
import { recoilMaxPage, recoilPage } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useState } from "react";

export default function BasicPagination() {
  const [page, setRecPage] = useRecoilState<number>(recoilPage);
  const [maxPage] = useRecoilState<number>(recoilMaxPage);
  const [width, setWidth] = useState<number>(window.innerWidth);

  function setPage(page: number) {
    console.log("page: ", page);
    sessionStorage.setItem("page", JSON.stringify(page));
    setRecPage(page);
  }

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
          setPage(value)
        }
        count={maxPage}
        variant="outlined"
        size={getSize()}
        shape="rounded"
      />
    </div>
  );
}
