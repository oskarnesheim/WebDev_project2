import Pagination from "@mui/material/Pagination";
import { recoilPage } from "../recoil/atoms";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useState } from "react";

type BasicPaginationProps = {
  maxPage: number;
};

export default function BasicPagination({ maxPage }: BasicPaginationProps) {
  const [page, setRecPage] = useRecoilState<number>(recoilPage);
  const [width, setWidth] = useState<number>(window.innerWidth);

  function setPage(page: number) {
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

  return (
    <div className="pagination">
      <Pagination
        page={page}
        onChange={(_e: React.ChangeEvent<unknown>, value: number) =>
          setPage(value)
        }
        count={maxPage}
        variant="outlined"
        size={width > 465 ? "large" : "small"}
        shape="rounded"
      />
    </div>
  );
}
