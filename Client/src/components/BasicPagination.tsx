import Pagination from "@mui/material/Pagination";
import { recoilPage } from "../recoil/atoms";
import { useRecoilState } from "recoil";
// import Stack from "@mui/material/Stack";

type BasicPaginationProps = {
  // page: number;
  // setPage: React.Dispatch<React.SetStateAction<number>>;
  maxPage: number;
};

export default function BasicPagination({ maxPage }: BasicPaginationProps) {
  const [page, setRecPage] = useRecoilState<number>(recoilPage);

  function setPage(page: number) {
    sessionStorage.setItem("page", JSON.stringify(page));
    setRecPage(page);
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
        size="large"
        shape="rounded"
      />
    </div>
  );
}
